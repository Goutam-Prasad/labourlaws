import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const EsicInput = ({ requestData, setrequestData }) => {
  const clickHandler = (e) => {
    try {
      const selection = e.target.name;
      // //(props.requestData);
      // //("selection".selection);

      const updatedData = {
        ...requestData,
      };
      updatedData.esic[selection] = e.target.value;
      //("Updated data", updatedData);
      setrequestData(Object.assign({}, updatedData));
    } catch (err) {
      //(err);
    }
  };

  return (
    <div>
      {/* <label htmlFor="esicinput">Enter Gross Salary</label>
      <input type="text" /> */}
      <InputGroup className="mb-3" style={{ width: "20em" }}>
        <InputGroup.Text id="inputGroup-sizing-default">
          Enter Gross Salary
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          name="grossSalary"
          onChange={clickHandler}
          required
        />
      </InputGroup>
    </div>
  );
};
export default EsicInput;
