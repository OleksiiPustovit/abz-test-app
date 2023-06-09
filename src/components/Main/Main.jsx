import React from "react";
import "./Main.scss";
import { Hero } from "../Hero/Hero";
import { GetSection } from "../GetSection/GetSection";
import { PostSection } from "../PostSection";
import { FormProvider } from "../../services/FormContext";

export const Main = () => {
  return (
    <div className="main">
      <div className="container">
      <Hero />
      <FormProvider>
        <GetSection />
        <PostSection />
      </FormProvider>

      </div>
    </div>
  );
};