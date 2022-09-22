import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { baseUrl } from "../../../api/baseurl";
import LoadingSpinner from "../../common/spinner";

const PtTaxForm = (props) => {
  // //(props);
  const [isLoading, setisLoading] = useState(false);
  const [StateList, setStateList] = useState([]);

  const getList = async () => {
    setisLoading(true);
    const result = await axios.get(`${baseUrl}/getStateList`);
    // //(result.data);
    setisLoading(false);
    setStateList(result.data);
  };

  useEffect(() => {
    getList();
  }, []);

  const clickHandler = (e) => {
    try {
      const selection = e.target.name;
      // //(props.requestData);
      // //("selection".selection);

      const updatedData = {
        ...props.requestData,
      };
      updatedData.ptTax[selection] = e.target.value;
      // //("Updated data", updatedData);
      props.setrequestData(Object.assign({}, updatedData));
    } catch (err) {
      //(err);
    }
  };
  const stateListData = StateList.map((state) => {
    return (
      <option key={state._id} value={state.name}>
        {state.name}
      </option>
    );
  });
  const changeHandler = (e) => {
    try {
      const selection = e.target.name;
      // //(props.requestData);
      // //("selection".selection);

      const updatedData = {
        ...props.requestData,
      };
      updatedData.ptTax[selection] = e.target.value;
      //("Updated data", updatedData);
      props.setrequestData(Object.assign({}, updatedData));
    } catch (err) {
      //(err);
    }
  };

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      {!isLoading && StateList && (
        <div>
          <Form.Select
            defaultValue="Select state"
            style={{ width: "15em" }}
            name="state"
            onClick={clickHandler}
          >
            <option value="Select state" disabled>
              select state
            </option>
            {stateListData}
          </Form.Select>
          <Form.Select
            style={{ width: "15em" }}
            name="gender"
            onClick={clickHandler}
            required
          >
            <option value="">Select Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </Form.Select>

          <Form.Select
            defaultValue="Select Salary Type"
            style={{ width: "15em" }}
            name="salaryType"
            onClick={clickHandler}
            required
          >
            <option value="Select Salary Type">Select Salary Type</option>
            <option value="Annual">Annual</option>
            <option value="Monthly">Monthly</option>
          </Form.Select>
          {/* <label htmlFor="salary">Salary</label>
          <input type="text" required style={{ width: "12em" }} /> */}
          <InputGroup className="mb-3" style={{ width: "15em" }}>
            <InputGroup.Text id="salary">Salary</InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="salary"
              name="salary"
              onChange={changeHandler}
              required
            />
          </InputGroup>
        </div>
      )}
    </div>
  );
};

export default PtTaxForm;
