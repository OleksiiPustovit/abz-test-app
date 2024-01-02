import React, {useContext, useEffect, useState} from "react";
import "./GetSection.scss";
import { UserList } from "../UserList";
import { FormContext } from "../../services/FormContext";


export const GetSection = () => {
  const { shouldUpdate } = useContext(FormContext);
  const [updateFlag, setUpdateFlag] = useState(false);

  useEffect(() => {
    if (shouldUpdate) {
      setUpdateFlag(!updateFlag);
    }
  }, [shouldUpdate]);  
  
  return (
    <section className="get-section" id="user">
      <div className="get-section__title">
        <span>Working with GET request</span>
      </div>
      <UserList key={updateFlag} />
    </section>
  );
};