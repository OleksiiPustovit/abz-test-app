import React from "react";
import "./UserCard.scss";




export const UserCard = ({
  user: {
    name,
    email,
    phone,
    position,
    photo
  }
}) => {

  return (
    <div className="user">
      <div className="user__wrapper" >
        <img src={photo} alt="user"  className="user__photo"/>
        <div className="user__info">
          
          <div className="user__name">{name}</div>
          <div className="user__position">{position}</div>

          <div className="user__email">{email}</div>
          <div className="user__phone">{phone}</div>
        </div>
      </div>
    </div>
  );
};