import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const BonusPage = ({ setrequestData, requestData }) => {
  const clickHandler = (e) => {
    try {
      const selection = e.target.name;
      // //(props.requestData);
      // //("selection".selection);

      const updatedData = {
        ...requestData,
      };
      updatedData.bonus[selection] = e.target.value;
      //("Updated data", updatedData);
      setrequestData(Object.assign({}, updatedData));
    } catch (err) {
      //(err);
    }
  };
  return (
    <div>
      {/* <label htmlFor="bonusinput">Input Basic Salary </label>
      <input type="text" required /> */}
      <InputGroup className="mb-3" style={{ width: "15em" }}>
        <InputGroup.Text id="inputGroup-sizing-default">
          Enter Salary
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          name="basicSalary"
          onChange={clickHandler}
          required
        />
      </InputGroup>
    </div>
  );
};
export default BonusPage;
