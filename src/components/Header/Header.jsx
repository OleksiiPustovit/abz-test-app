import React from "react";
import "./Header.scss";
import { Button } from "../Button/Button";
import logo from "../../images/Logo.png"

export const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo">
          <a
            className="header__logo-link" 
            href="/"
          >
            <img 
              className="header__logo--img"
              src={logo}
              alt="logo" 
            />
          </a>
        </div>
        <div className="header__buttons">
          <Button link={`#user`} text={'User'} />
          <Button link={`#sign-up`} text={'Sign up'} />
        </div>
      </div>
    </header>
  );
};