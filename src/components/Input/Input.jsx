import React from "react";
import './style.css';
const Input = ({ type, value, setValue, placeholder }) => {
  return (
    <input
    className="customInput"
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required={true}
      placeholder={placeholder}
    />
  );
};

export default Input;
