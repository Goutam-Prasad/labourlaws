import React from "react";

const LwfResultData = ({ LwfResult }) => {
  return (
    <div>
      {Object.keys(LwfResult).map((key, index) => {
        return (
          <div key={index}>
            <p>
              <b>{key} :</b>
              {LwfResult[key]}
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default LwfResultData;
