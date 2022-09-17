import React from "react";

const MinWageResult = (props) => {
  return (
    <div>
      {Object.keys(props.WageResult).map((key, index) => {
        return (
          <div key={index}>
            <p>
              <b>{key} :</b>
              {props.WageResult[key]}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default MinWageResult;
