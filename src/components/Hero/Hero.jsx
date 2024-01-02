import React from "react";
import "./Hero.scss";
import { Button } from "../Button/Button";

export const Hero = () => {
  return(
    <div className="hero">
      <div className="inner-container">
        <div className="hero__title">
        Test assignment for front-end developer
        </div>
        <div className="hero__subtitle">
        What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
        </div>

        <Button link={`#sign-up`} text={'Sign up'} />
      </div>
    </div>
  )
};