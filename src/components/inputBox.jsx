import React from "react";
import iconO from ".././assets/icon-o.svg";
import iconX from ".././assets/icon-x.svg";

const InputBox = ({ id, value, handleClick }) => {
  return (
    <div id={id} onClick={() => handleClick(id)} className="input-box">
        {value === "" ? (
          ""
        ) : value === "X" ? (
          <img src={iconX} />
        ) : (
          <img src={iconO} />
        )}
    </div>
  );
};

export default InputBox;
