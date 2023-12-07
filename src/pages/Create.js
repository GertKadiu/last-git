import React from "react";
import classes from "./Create.module.css";
import { CreateUser } from "../hooks/Action";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Avatar from "@mui/material/Avatar";
import Title from "../components/Title/Title";
import Button from "../UI/Button/Button";
import { ButtonTypes } from "../UI/Button/ButtonTypes";
import Image from "../components/Image";
import ClipLoader from "react-spinners/ClipLoader";
import { Alert } from "../components/Alert";
import Modal from "../components/Modal/Modal";

const ContactForm = () => {
  const {
    Submit,
    success,
    name,
    email,
    age,
    formIsValid,
    nameInputHasError,
    nameChangeHandler,
    nameBlurHandler,
    ageInputHasError,
    ageChangeHandler,
    ageBlurHandler,
    emailInputHasError,
    isLoading,
    emailBlurHandler,
    emailChangeHandler,
    imageURL,
    handleImageChange,
    showModal,
    onCancel,
    onConfirm,
    stay,
  } = CreateUser();

  return (
    <div className={classes.contanier}>
      <Title
        Icon={
          <Link to="/Events">
            <ArrowBackIosIcon style={{ color: "#FFFFFF" }} />
          </Link>
        }
      >
        Create User
      </Title>
      <div className={classes.contanier2}>
        {success && <Alert>User updated successfully</Alert>}
        <div className={classes.avatar}>
          <Avatar
            src={imageURL}
            style={{
              height: "120px",
              width: "120px",
              margin: "20px 24px 32px 0",
            }}
          />
          <Image onChange={handleImageChange} />
        </div>
        <div className={classes.inputs}>
          <div style={{ width: "312px", marginBottom: "16px" }}>
            <Input
              label="Name"
              type="text"
              variant="filled"
              id="name"
              name="name"
              IsUsername
              value={name}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              error={nameInputHasError}
              errortext="Name is Require"
            />
          </div>
          <div style={{ width: "312px" }}>
            <Input
              label="Email"
              value={email}
              onChange={emailChangeHandler}
              error={emailInputHasError}
              onBlur={emailBlurHandler}
              variant="filled"
              inputType="email"
              IsUsername
              type="email"
              errortext="Email includes '@!"
            />
          </div>
        </div>
        <div className={classes.inputs}></div>
        <div className={classes.input}>
          <div className={classes.age}>
            <Input
              label="age"
              IsUsername
              className="input"
              variant="filled"
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={ageChangeHandler}
              onBlur={ageBlurHandler}
              onError={ageInputHasError}
              errortext="Email includes '@!"
            />
          </div>
        </div>

        <div className={classes.inputs}>
          <Button
            type={ButtonTypes.CANCEL}
            btnText="Cancel"
            onClick={onCancel}
          />
          <Button
            onClick={Submit}
            type={formIsValid ? ButtonTypes.SAVE : ButtonTypes.DISABLED}
            btnText={
              isLoading ? (
                <ClipLoader
                  color={"white"}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Create"
              )
            }
          />
        </div>
      </div>
      {showModal && (
        <Modal
          type="Sure you want to leave this page?"
          confirm="Continue"
          cancel="Cancel"
          onDelete={onConfirm}
          onCancel={stay}
        >
          All your changes will not be saved!
        </Modal>
      )}
    </div>
  );
};

export default ContactForm;
