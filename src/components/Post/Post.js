import React from "react";
import Card from "../../UI/Card";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import GroupIcon from "@mui/icons-material/Group";
import classes from "./Post.module.css";

function Post({
  image,
  location,
  participants,
  description,
  date,
  name,
  eventName,
  View,
}) {
  return (
    <Card>
      <div className={classes.conatiner}>
        <img src={image} alt="Event" className={classes.img} />
        <div className={classes.date}>{date}</div>
        <div className={classes.space}>
          <div className={classes.eventName}>{eventName}</div>
          <div className={classes.location}>
            <LocationOnIcon />
            <div className={classes.text}>{location}</div>
          </div>
          <div className={classes.logo}>
            <GroupIcon />
            <div className={classes.text}>{name}</div>
          </div>
          <div
            style={{
              width: "297px",
              height: "78px",
            }}
          >
            {description}
          </div>
          <div className={classes.participants}>
            Participants: {participants}
          </div>
          <div style={{ alignItems: "center" }}>{View}</div>
        </div>
      </div>
    </Card>
  );
}

export default Post;
