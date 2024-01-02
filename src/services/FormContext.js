import React, { createContext, useState } from "react";

export const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [shouldUpdate, setShouldUpdate] = useState(false);

  const handleFormSubmit = () => {
    setShouldUpdate(true);
  };

  return (
    <FormContext.Provider value={{ shouldUpdate, handleFormSubmit }}>
      {children}
    </FormContext.Provider>
  );
};