import classes from "./SingleEvent.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Avatar from "@mui/material/Avatar";
import { DeletePost } from "../hooks/Action-Post";
import Modal from "../components/Modal/Modal";
import { format } from "date-fns";
import GroupIcon from "@mui/icons-material/Group";
import Button from "../UI/Button/Button";
import { ButtonTypes } from "../UI/Button/ButtonTypes";
import Title from "../components/Title/Title";
import SingleUser from "./SingleUser";
import ContentLoader from "react-content-loader";

const SingleEvent = () => {
  const [singleEvent, setSingleEvent] = useState({});
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const { handleDeletePost, confirmDelete, showModal, setShowModal } =
    DeletePost();

  useEffect(() => {
    axios
      .get(`https://finally-nu2d.onrender.com/SingleEvent/${id}`)
      .then((result) => {
        setSingleEvent(result.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function isValidDate(date) {
    return !isNaN(Date.parse(date));
  }

  const backgroundStyle = {
    minHeight: "525px",
    backgroundImage: `linear-gradient(180deg, #1E1D2300, #16161B),
    url(${process.env.PUBLIC_URL + singleEvent.image})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    objectFit: "cover",
    position: "relative",
  };

  return (
    <div>
      <div style={backgroundStyle}>
        <div className={classes.contanier}>
          <Title
            Icon={
              <Link to="/Events">
                <ArrowBackIosIcon style={{ color: "#FFFFFF" }} />
              </Link>
            }
          >
            {singleEvent.eventName}
          </Title>
        </div>

        <div className={classes.contanier2}>
          <div className={classes.event}>
            <h1>{singleEvent.eventName}</h1>
            <Link to={`/editEvent/${singleEvent._id}`}>
              <Button type={ButtonTypes.EDIT} btnText="Edit Event" />
            </Link>
          </div>
          <div className={classes.data}>
            {isLoading ? (
              <ContentLoader
                height={44}
                width={"100%"}
                speed={2}
                backgroundColor={"#666666"}
                foregroundColor={"#999"}
              >
                <rect x="0" y="0" rx="50" ry="50" width="42" height="42" />
                <rect x="60" y="15" rx="4" ry="4" width="90" height="8" />
              </ContentLoader>
            ) : (
              <div className={classes.flex}>
                <div className={classes.Icon}>
                  <CalendarMonthIcon />
                </div>
                <div className={classes.space}>
                  {isValidDate(singleEvent.date)
                    ? format(new Date(singleEvent.date), "d MMM - h:mm a")
                    : "Invalid Date"}
                </div>
              </div>
            )}
            {isLoading ? (
              <ContentLoader
                height={44}
                width={"100%"}
                speed={2}
                backgroundColor={"#666666"}
                foregroundColor={"#999"}
              >
                <rect x="0" y="0" rx="50" ry="50" width="42" height="42" />
                <rect x="60" y="15" rx="4" ry="4" width="90" height="8" />
              </ContentLoader>
            ) : (
              <div className={classes.flex}>
                <div className={classes.Icon}>
                  <LocationOnIcon />
                </div>
                <div className={classes.space}>{singleEvent.location}</div>
              </div>
            )}
            {isLoading ? (
              <ContentLoader
                height={44}
                width={"100%"}
                speed={2}
                backgroundColor={"#666666"}
                foregroundColor={"#999"}
              >
                <rect x="0" y="0" rx="50" ry="50" width="42" height="42" />
                <rect x="60" y="15" rx="4" ry="4" width="90" height="8" />
              </ContentLoader>
            ) : (
              <div className={classes.flex}>
                <div className={classes.Icon}>
                  <GroupIcon />
                </div>
                <div key={SingleUser.id} className={classes.space}>
                  {singleEvent.creator && singleEvent.creator.name}
                </div>
              </div>
            )}
          </div>
          <div className={classes.about}>
            {isLoading ? (
              <ContentLoader
                height={44}
                width={"100%"}
                speed={2}
                backgroundColor={"#666666"}
                foregroundColor={"#999"}
              >
                <rect x="00" y="11" rx="4" ry="4" width="80" height="8" />
              </ContentLoader>
            ) : (
              <h2>About</h2>
            )}
            {isLoading ? (
              <ContentLoader
                height={44}
                width={"100%"}
                speed={2}
                backgroundColor={"#666666"}
                foregroundColor={"#999"}
              >
                <rect x="00" y="11" rx="4" ry="4" width="650" height="8" />
              </ContentLoader>
            ) : (
              <div>{singleEvent.description}</div>
            )}
          </div>
        </div>
      </div>
      <div className={classes.end}>
        Participants ({singleEvent.participants?.length})
        <div className={classes.background}>
          {isLoading
            ? singleEvent.participants &&
              singleEvent.participants.map((participant) => (
                <ContentLoader
                  height={44}
                  width={"100%"}
                  speed={2}
                  backgroundColor={"#666666"}
                  foregroundColor={"#999"}
                >
                  <rect x="0" y="0" rx="50" ry="50" width="32" height="32" />
                  <rect x="40" y="11" rx="4" ry="4" width="90" height="8" />
                  <rect x="0" y="38" rx="3" ry="3" width="490" height="1" />
                </ContentLoader>
              ))
            : singleEvent.participants &&
              singleEvent.participants.map((participant, index) => (
                <div key={index} className={classes.participants}>
                  <Avatar
                    as={Link}
                    to={`/singleUser/${participant._id}`}
                    src={participant.image}
                    style={{
                      height: "32px",
                      width: "32px",
                      marginRight: "17px",
                    }}
                  />
                  <Link
                    style={{ textDecoration: "none", color: "#FFFFFF" }}
                    to={`/singleUser/${participant._id}`}
                  >
                    {participant.name}
                  </Link>
                </div>
              ))}
        </div>
        <Button
          type={ButtonTypes.CREATE}
          btnText="Delete Event"
          onClick={() => handleDeletePost(singleEvent._id)}
        />
      </div>
      {showModal && (
        <Modal
          type="Confirm Delete"
          confirm="Confirm"
          cancel="Cancel"
          onCancel={() => setShowModal(false)}
          onDelete={confirmDelete}
        >
          Are you sure you want to delete this Event?
        </Modal>
      )}
    </div>
  );
};

export default SingleEvent;
