import React from "react";
import iconO from ".././assets/icon-o.svg";
import iconX from ".././assets/icon-x.svg";

const InputBox = ({ id, value, handleClick }) => {
  return (
    <div id={id} onClick={() => handleClick(id)} className="input-box ">
        {value === "" ? (
          ""
        ) : value === "X" ? (
          <img src={iconX} className="w-[40px] md:w-[64px]" />
        ) : (
          <img src={iconO} className="w-[40px] md:w-[64px]"  />
        )}
    </div>
  );
};

export default InputBox;
