import React from "react";

const PTResult = ({ PtResult }) => {
  return (
    <div>
      {Object.keys(PtResult).map((key, index) => {
        return (
          <div key={index}>
            <p>
              <b>{key} :</b>
              {PtResult[key]}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default PTResult;
