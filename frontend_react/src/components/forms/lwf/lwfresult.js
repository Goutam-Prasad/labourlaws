import React from "react";

const LwfResultData = ({ LwfResult }) => {
  return (
    <div>
      {Object.keys(LwfResult).map((key, index) => {
        return (
          <div key={index}>
            <div>
              {key === "Link" && (
                <p>
                  <b>{key} :</b>
                  <a href={LwfResult[key]}>{LwfResult[key]}</a>
                </p>
              )}
              {key !== "Link" && (
                <p>
                  <b>{key} :</b>
                  {LwfResult[key]}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default LwfResultData;
