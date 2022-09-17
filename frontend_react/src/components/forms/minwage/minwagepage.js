import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";

const MinWagePage = (props) => {
  const [StateList, setStateList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [showOptions, setshowOptions] = useState({});
  const [stateName, setstateName] = useState("Select State");

  const getList = async () => {
    setisLoading(true);
    const result = await axios.get("http://localhost:5000/getStateList");
    setisLoading(false);
    setStateList(result.data);
  };

  const changeHandler = (e) => {
    const stateName = e.target.value;
    try {
      setstateName(stateName);
      props.setWageResult(false);
      if (props.requestData.minwage) {
        // //(
        //   "new State Clicked Bf upddating state the val is",
        //   props.requestData
        // );
        const updatedData = { ...props.requestData };
        updatedData.minwage = Object.assign({}, {});
        updatedData.minwage["state"] = e.target.value;
        // //("Updataed data", updatedData);
        // //(props);
        props.setrequestData(Object.assign({}, updatedData));
      }
      setisLoading(true);
      axios
        .get(`http://localhost:5000/minimumwage/${stateName}`)
        .then((response) => {
          setisLoading(false);
          // //(response.data);
          setshowOptions(response.data);
          // setshowDetails(JSON.stringify(response.data));
        })
        .catch((err) => {
          //(err);
        });
    } catch (error) {
      //(error);
    }
  };

  const getChoices = (option) => {
    const result = option.map((choice) => {
      return (
        <option value={choice} key={choice}>
          {choice}
        </option>
      );
    });
    // //("result ", result);
    return result;
  };

  const clickHandler = (e) => {
    try {
      const selection = e.target.name;
      // //(props.requestData);
      // //("selection", selection);

      const updatedData = {
        ...props.requestData,
      };
      updatedData.minwage[selection] = e.target.value;
      // //("Updated data", updatedData);
      props.setrequestData(Object.assign({}, updatedData));
    } catch (err) {
      //(err);
    }
  };

  const optionsArray = Object.keys(showOptions);
  const MinWageOptionList = optionsArray.map((option) => {
    const choices = getChoices(showOptions[option]);
    return (
      <Form.Select
        defaultValue={option}
        name={option}
        onChange={clickHandler}
        key={option}
        style={{ width: "15rem" }}
      >
        <option value={option} key={option}>
          {option}
        </option>
        {choices}
      </Form.Select>
    );
  });
  useEffect(() => {
    getList();
  }, []);

  const stateListData = StateList.map((state) => {
    return (
      <option key={state._id} value={state.name}>
        {state.name}
      </option>
    );
  });

  return (
    <div>
      <div>
        {isLoading && (
          <div>
            <p>Loading</p>
          </div>
        )}
        {!isLoading && StateList && (
          <Form.Select
            name="state"
            defaultValue={stateName}
            onChange={changeHandler}
            style={{ width: "15em" }}
          >
            <option value="Select State">Select State</option>

            {stateListData}
          </Form.Select>
        )}
      </div>
      {showOptions && MinWageOptionList}
    </div>
  );
};

export default MinWagePage;
