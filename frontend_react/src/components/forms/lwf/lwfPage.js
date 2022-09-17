import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

const LwfPage = (props) => {
  const [StateList, setStateList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [showOptions, setshowOptions] = useState([]);
  const [stateName, setstateName] = useState("Select State");

  const getList = async () => {
    setisLoading(true);
    const result = await axios.get("http://localhost:5000/getStateList");
    // //(result.data);
    setisLoading(false);
    setStateList(result.data);
  };

  const clickHandler = (e) => {
    setisLoading(true);
    const stateName = e.target.value;

    try {
      setstateName(stateName);
      if (props.requestData.lwf) {
        // //("new State Clicked", props.requestData);
        const updatedData = { ...props.requestData };
        updatedData.lwf = Object.assign({}, {});
        updatedData.lwf["state"] = e.target.value;
        // //("Updataed data", updatedData);
        // //(props);
        props.setrequestData(Object.assign({}, updatedData));
        // //("final Data", updatedData);
      }
      axios
        .get(`http://localhost:5000/lwf/${stateName}`)
        .then((response) => {
          setisLoading(false);
          //(response.data.options);
          if (
            response.data.options[0] !== "Rules not applicable in this state"
          ) {
            setshowOptions(response.data.options);
          } else {
            window.alert("Rules Not Applicable for this state");
            setshowOptions([]);
          }
          // setshowDetails(JSON.stringify(response.data));
        })
        .catch((err) => {
          //(err);
        });
    } catch (error) {
      //(error);
    }
  };

  const stateListData = StateList.map((state) => {
    return (
      <option key={state._id} value={state.name}>
        {state.name}
      </option>
    );
  });

  const optionsAvailable = showOptions.map((option) => {
    return (
      <option value={option} key={option}>
        {option}
      </option>
    );
  });

  const changeHandler = (e) => {
    try {
      const selection = e.target.name;
      // //(props.requestData);
      // //("selection", selection);

      const updatedData = {
        ...props.requestData,
      };
      updatedData.lwf[selection] = e.target.value;
      //("Updated data", updatedData);
      props.setrequestData(Object.assign({}, updatedData));
    } catch (err) {
      //(err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div>
      <h2>Lwf Section</h2>
      {isLoading && (
        <div>
          <p>Loading</p>
        </div>
      )}
      {!isLoading && StateList && (
        <Form.Select
          defaultValue={stateName}
          name="state"
          onChange={clickHandler}
          style={{ width: "15rem" }}
        >
          <option value="Select State" disabled>
            Select state
          </option>
          {stateListData}
        </Form.Select>
      )}
      {showOptions.length !== 0 && (
        <div>
          <Form.Select
            name="employment_class"
            defaultValue="Select Options"
            onChange={changeHandler}
            style={{ width: "15rem" }}
          >
            <option value="Select Options">Select Options</option>
            {optionsAvailable}
          </Form.Select>
          <div>
            <label htmlFor="gross_Salary">Enter Gross Salary</label>
            <input type="text" name="gross_salary" id="gross_salary" required />
          </div>
          <div>
            {/**gross_salary, employment_class, employee_count */}
            <label htmlFor="employee_count">Number of employee</label>
            <input
              type="text"
              name="employee_count"
              id="employee_count"
              required
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default LwfPage;
