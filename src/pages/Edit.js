import React from "react";
import { UpdateUser } from "../hooks/Action";
import { Alert } from "../components/Alert";
import Input from "../components/Input";
import classes from "./Edit.module.css";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Avatar from "@mui/material/Avatar";
import Title from "../components/Title/Title";
import Button from "../UI/Button/Button";
import { ButtonTypes } from "../UI/Button/ButtonTypes";
import Image from "../components/Image";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "../components/Modal/Modal";

const ContactForm = () => {
  const {
    Update,
    success,
    name,
    setName,
    age,
    setAge,
    email,
    setEmail,
    image,
    imageURL,
    handleImageChange,
    isLoading,
    showModal,
    onCancel,
    onConfirm,
    stay,
  } = UpdateUser();

  return (
    <div className={classes.contanier}>
      <Title
        Icon={
          <Link to="/">
            <ArrowBackIosIcon style={{ color: "#FFFFFF" }} />
          </Link>
        }
      >
        Edit Profile
      </Title>
      <div className={classes.contanier2}>
        {success && <Alert>User updated successfully</Alert>}
        <div className={classes.avatar}>
          <Avatar
            src={imageURL || image}
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
              onChange={(e) => setName(e.target.value)}
              errortext="Name is Require"
            />
          </div>
          <div style={{ width: "312px" }}>
            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <div style={{ width: "312px", marginBottom: "16px" }}>
            <Input
              label="age"
              IsUsername
              className="input"
              variant="filled"
              type="number"
              id="age"
              name="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
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
            onClick={Update}
            type={ButtonTypes.SAVE}
            btnText={
              isLoading ? (
                <ClipLoader
                  color={"white"}
                  size={15}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Save"
              )
            }
          />
        </div>
      </div>
      {showModal && (
        <Modal
          confirm="Leave"
          cancel="Stay"
          type="Leave Edit Page"
          onDelete={onConfirm}
          onCancel={stay}
        >
          Are u sure u want to leave this page?
        </Modal>
      )}
    </div>
  );
};

export default ContactForm;
