import React from "react";
import "./Loader.scss";

export const Loader = () => {
  return (
    <div className="loader">
      <img src="./Preloader.png" alt="loader" className="loader__img" />
    </div>
  );
}