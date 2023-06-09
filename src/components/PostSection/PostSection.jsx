import React, { useState, useEffect, useContext } from "react";
import "./PostSection.scss";
import { FormContext  } from "../../services/FormContext";

import { getPositions, getToken, sendUser } from "../../services/API";

export const PostSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [radioOption, setRadioOption] = useState("");
  const [photo, setPhoto] = useState(null);
  const [position, setPosition] = useState([]);
  const [token, setToken] = useState("");
  const [photoName, setPhotoName] = useState("Upload your photo");
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    radioOption: "",
    photo: "",
  });
  const { handleFormSubmit } = useContext(FormContext);

  useEffect(() => {
    setIsFormValid(
      name !== "" &&
      email !== "" &&
      phone !== "" &&
      radioOption !== "" &&
      photo !== null
    );
  }, [name, email, phone, radioOption, photo]);

  useEffect(() => {
    getToken()
      .then((data) => {
        setToken(data.token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    getPositions()
      .then((data) => {
        setPosition(data.positions);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, phone: "" }));
  };

  const handleRadioChange = (event) => {
    setRadioOption(parseInt(event.target.value));
    setErrors((prevErrors) => ({ ...prevErrors, radioOption: "" }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
    setPhotoName(file.name);
    setErrors((prevErrors) => ({ ...prevErrors, photo: "" }));
  };

  const handleNameBlur = () => {
    if (name.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Enter valid name",
      }));
    }
  };

  const handleEmailBlur = () => {
    if (email.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Enter valid email (example@mail.com)",
      }));
    }
  };

  const handlePhoneBlur = () => {
    if (phone.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        phone: "Enter valid phone number",
      }));
    }
  };

  const handleRadioBlur = () => {
    if (!radioOption) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        radioOption: "Select an option",
      }));
    }
  };

  const handlePhotoBlur = () => {
    if (!photo) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        photo: "Select your photo (Only .jpg, .jpeg)",
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let formValid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
      radioOption: "",
      photo: "",
    };

    if (name.trim() === "") {
      formValid = false;
      newErrors.name = "Enter a name";
    }

    if (email.trim() === "") {
      formValid = false;
      newErrors.email = "Enter an email";
    } else {
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailPattern.test(email)) {
        formValid = false;
        newErrors.email = "Invalid email format";
      }
    }

    if (phone.trim() === "") {
      formValid = false;
      newErrors.phone = "Enter a phone number";
    } else {
      const phonePattern = /^\+380\d{9}$/;
      if (!phonePattern.test(phone)) {
        formValid = false;
        newErrors.phone = "Invalid phone number format";
      }
    }

    if (!radioOption) {
      formValid = false;
      newErrors.radioOption = "Select an option";
    }

    if (!photo) {
      formValid = false;
      newErrors.photo = "Select your photo (Only .jpg, .jpeg)";
    } else {
      const filePattern = /^.*\.(jpg|jpeg)$/i;
      if (!filePattern.test(photo.name)) {
        formValid = false;
        newErrors.photo = "Invalid file format. Only .jpg and .jpeg are allowed.";
      }
    }

    setErrors(newErrors);

    if (formValid) {
      const formData = new FormData();
      formData.append("position_id", parseInt(radioOption));
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("photo", photo);


      sendUser(formData, token)
        .then((data) => {
          handleFormSubmit()
        });

      setName("");
      setEmail("");
      setPhone("");
      setRadioOption("");
      setPhoto(null);
      setPhotoName("Upload your photo");
    }
  };

  return (
    <div id="sign-up" className="post-section">
      <div className="post-section__title">
        <span>Working with POST request</span>
      </div>
      <form
        method="POST"
        encType="multipart/form-data"
        className="form"
        onSubmit={handleSubmit}
      >
        <label>
          <input
            required
            className="form__input"
            placeholder="Your name"
            type="text"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
          />
          {errors.name && <span className="form__error">{errors.name}</span>}
        </label>
        <label>
          <input
            required
            className="form__input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
          />
          {errors.email && <span className="form__error">{errors.email}</span>}
        </label>
        <label>
          <input
            required
            className="form__input"
            placeholder="Phone"
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            onBlur={handlePhoneBlur}
          />
          <small className="form__input-small">+38 (XXX) XXX - XX - XX</small>
          {errors.phone && <span className="form__error">{errors.phone}</span>}
        </label>
        <div className="form__radio-wrapper">
          Select your position
          {position.map((item) => (
            <label className="form__radio-label" key={item.id}>
              <input
                required
                className="form__radio"
                type="radio"
                value={item.id}
                checked={radioOption === item.id}
                onChange={handleRadioChange}
                onBlur={handleRadioBlur}
              />
              <span className="form__radio-text">{item.name}</span>
            </label>
          ))}
          {errors.radioOption && <span className="form__error">{errors.radioOption}</span>}
        </div>
        <label className="form__label">
          <div className="form__label-text">Upload</div>
          <input
            className="form__file"
            required
            onChange={handlePhotoChange}
            onBlur={handlePhotoBlur}
            type="file"
            accept="image/*"
          />
          {photoName && <span>{photoName}</span>}
        </label>
        {errors.photo && <span className="form__error">{errors.photo}</span>}

        <button
          className={`button ${isFormValid ? "" : "button__disabled"}`}
          type="submit"
          disabled={!isFormValid}
        >
          Sign up
        </button>
      </form>
    </div>
  );
};