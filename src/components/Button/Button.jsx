import React from "react";
import "./Button.scss";


export const Button = ({ text, link }) => {
  return (
    <button type="button" className="button">
      <a href={link} className="button__text">{text}</a>
    </button>
  );
};