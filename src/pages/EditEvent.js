import classes from "./EditEvent.module.css";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import MultipleSelect from "../components/Selecter";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Button from "../UI/Button/Button";
import { ButtonTypes } from "../UI/Button/ButtonTypes";
import Title from "../components/Title/Title";
import Image from "../components/Image";
import BasicSelect from "../components/Creator";
import Modal from "../components/Modal/Modal";
import { UpdatePost } from "../hooks/Action-Post";
import { Alert } from "../components/Alert";

const EditEvent = () => {
  const {
    UpdateEvent,
    success,
    eventName,
    description,
    participants,
    location,
    creator,
    setCreator,
    setDescription,
    setEventName,
    setLocation,
    handleParticipantsChange,
    handleImageChange,
    image,
    imageURL,
    showModal,
    onCancel,
    onConfirm,
    stay,
  } = UpdatePost();

  return (
    <div className={classes.contanier}>
      <Title
        Icon={
          <Link to="/Events">
            <ArrowBackIosIcon style={{ color: "#FFFFFF" }} />
          </Link>
        }
      >
        Edit Event
      </Title>
      <div className={classes.contanier2}>
        {success && <Alert>Event updated successfully</Alert>}
        <div style={{ height: "20px" }}></div>
        {imageURL ? (
          <div className={classes.place}>
            <img
              src={imageURL || image}
              alt="Selected"
              className={classes.img}
            />
          </div>
        ) : null}
        <Image onChange={handleImageChange} />
        <div className={classes.inputs}>
          <div style={{ width: "312px", marginBottom: "16px" }}>
            <Input
              label="Even tName"
              type="text"
              variant="filled"
              id="EventName"
              name="EventName"
              IsUsername
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              errortext="Event Name is Require"
              required
            />
          </div>
          <div style={{ width: "312px" }}>
            <Input
              IsUsername
              variant="filled"
              label="Event Location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              errortext="Location is Require"
              required
            />
          </div>
        </div>
        <div className={classes.inputs}>
          <div style={{ width: "312px", marginBottom: "16px" }}>
            <BasicSelect
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
            />
          </div>
          <div style={{ width: "312px", marginBottom: "12px" }}>
            <Input
              IsUsername
              variant="filled"
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              errortext="Description is Require"
              required
            />
          </div>
        </div>
        <div className={classes.input}>
          <div className={classes.selecter}>
            <MultipleSelect
              onChange={handleParticipantsChange}
              value={participants}
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
            onClick={UpdateEvent}
            type={ButtonTypes.SAVE}
            btnText="Save"
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

export default EditEvent;
