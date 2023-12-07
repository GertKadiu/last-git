import { Alert } from "../components/Alert";
import MultipleSelect from "../components/Selecter";
import Input from "../components/Input";
import Calendar from "../components/Calendar";
import { CreateEvents } from "../hooks/Action-Post";
import { Link } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import classes from "./CreateEvents.module.css";
import Title from "../components/Title/Title";
import Button from "../UI/Button/Button";
import { ButtonTypes } from "../UI/Button/ButtonTypes";
import Image from "../components/Image";
import BasicSelect from "../components/Creator";
import ClipLoader from "react-spinners/ClipLoader";
import Modal from "../components/Modal/Modal";

const EventCreationForm = () => {
  const {
    Submit,
    isLoading,
    success,
    eventName,
    eventNameBlurHandler,
    eventNameChangeHandler,
    eventNameInputHasError,
    date,
    setDate,
    creator,
    location,
    locationBlurHandler,
    locationChangeHandler,
    locationInputHasError,
    description,
    descriptionBlurHandler,
    descriptionChangeHandler,
    descriptionInputHasError,
    participants,
    handleChange,
    formIsValid,
    handleImageChange,
    creatorChangeHandler,
    creatorBlurHandler,
    creatorInputHasError,
    imageURL,
    showModal,
    onCancel,
    onConfirm,
    stay,
  } = CreateEvents();

  return (
    <div className={classes.contanier}>
      <Title
        Icon={
          <Link to="/Events">
            <ArrowBackIosIcon style={{ color: "#FFFFFF" }} />
          </Link>
        }
      >
        Create Event
      </Title>
      <div className={classes.contanier2}>
        {success && <Alert>Event created succesfully</Alert>}
        <div style={{ height: "20px" }}></div>
        {imageURL ? (
          <div className={classes.place}>
            <img src={imageURL} alt="Selected" className={classes.img} />
          </div>
        ) : null}
        <Image onChange={handleImageChange} />
        <div className={classes.inputs}>
          <div style={{ width: "312px", marginBottom: "16px" }}>
            <Input
              label="Event Name"
              type="text"
              variant="filled"
              id="EventName"
              name="EventName"
              IsUsername
              value={eventName}
              onChange={eventNameChangeHandler}
              onBlur={eventNameBlurHandler}
              error={eventNameInputHasError}
              errortext="Event Name is Require"
              required
            />
          </div>
          <div className={classes.EventLocation}>
            <Input
              IsUsername
              variant="filled"
              label="Event Location"
              type="text"
              value={location}
              onChange={locationChangeHandler}
              onBlur={locationBlurHandler}
              error={locationInputHasError}
              errortext="Location is Require"
              required
            />
          </div>
        </div>
        <div className={classes.inputs}>
          <div className={classes.Creator}>
            <BasicSelect
              value={creator}
              label="creator"
              onChange={creatorChangeHandler}
              onBlur={creatorBlurHandler}
              error={creatorInputHasError}
              errortext="Creator is Require"
            />
          </div>
          <div style={{ width: "312px", marginBottom: "16px" }}>
            <Calendar onChange={(newTime) => setDate(newTime)} value={date} />
          </div>
        </div>
        <div className={classes.input}>
          <div className={classes.selecter}>
            <Input
              IsUsername
              variant="filled"
              label="Description"
              value={description}
              onChange={descriptionChangeHandler}
              onBlur={descriptionBlurHandler}
              error={descriptionInputHasError}
              errortext="Description is Require"
              required
            />
          </div>
          <div className={classes.selecter}>
            <MultipleSelect onChange={handleChange} value={participants} />
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
                "Save"
              )
            }
          />
        </div>
      </div>
      {showModal && (
        <Modal
          type="Are you sure you want to leave this page?"
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

export default EventCreationForm;
