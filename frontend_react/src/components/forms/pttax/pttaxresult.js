import React from "react";

const PTResult = ({ PtResult }) => {
  return (
    <div>
      {Object.keys(PtResult).map((key, index) => {
        return (
          <div key={index}>
            <div>
              {key === "Website" && (
                <p>
                  <b>{key} :</b>
                  <a href={PtResult[key]}>{PtResult[key]}</a>
                </p>
              )}
              {key !== "Website" && (
                <p>
                  <b>{key} :</b>
                  {PtResult[key]}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PTResult;
