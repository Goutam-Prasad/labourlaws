import React from "react";

const EsicResultData = ({ EsicResult }) => {
  return (
    <div>
      {Object.keys(EsicResult).map((key, index) => {
        return (
          <div key={index}>
            <p>
              <b>{key} :</b>
              {EsicResult[key]}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default EsicResultData;
