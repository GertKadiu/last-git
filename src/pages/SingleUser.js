import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { SingleUserEvents } from "../hooks/Action";
import classes from "./SingleUser.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Post from "../components/Post/Post";
import Title from "../components/Title/Title";
import Button from "../UI/Button/Button";
import { ButtonTypes } from "../UI/Button/ButtonTypes";
import ContentLoader from "react-content-loader";

const SingleUser = () => {
  const [singleUser, setSingleUser] = useState(null);
  const {
    creatorEvents,
    handleTabClick,
    activeTab,
    participantEvents,
    id,
    isLoading,
  } = SingleUserEvents();

  useEffect(() => {
    axios
      .get(`https://finally-nu2d.onrender.com/SingleUser/${id}`)
      .then((result) => setSingleUser(result.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className={classes.contanier}>
      <div className={classes.title}>
        <Title
          Icon={
            <Link to="/">
              <ArrowBackIosIcon style={{ color: "#FFFFFF" }} />
            </Link>
          }
        >
          {singleUser?.name}
        </Title>
      </div>
      {singleUser && (
        <div className={classes.profile}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <Avatar
              as={Link}
              style={{ height: "60px", width: "60px" }}
              src={singleUser.image}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "20px",
              }}
            >
              <Link
                style={{
                  fontSize: "20px",
                  color: "#FFFFFF",
                  textDecoration: "none",
                }}
              >
                {singleUser.name}
              </Link>
              <div style={{ fontSize: "16px" }}> {singleUser.email}</div>
            </div>
          </div>
          <div className={classes.button}>
            <Link to={`/Update/${id}`}>
              <Button btnText="Edit Profile" type={ButtonTypes.EDIT} />
            </Link>
          </div>
        </div>
      )}
      <div className={classes.tabs}>
        <button
          onClick={() => handleTabClick("events")}
          className={activeTab === "events" ? classes.activetab : classes.tab}
        >
          My Events
        </button>
        <button
          className={
            activeTab === "participants" ? classes.activetab : classes.tab
          }
          onClick={() => handleTabClick("participants")}
        >
          Participating
        </button>
      </div>

      {activeTab === "events" && (
        <div className={classes.grid}>
          {isLoading
            ? creatorEvents.map((creatorEvent) => (
                <div
                  key={creatorEvent._id}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#1E1D23",
                  }}
                >
                  <ContentLoader
                    style={{
                      marginBottom: "40px",
                    }}
                    height={120}
                    speed={2}
                    backgroundColor={"#666666"}
                    foregroundColor={"#999"}
                  >
                    <rect x="0" y="0" rx="5" ry="5" width="344" height="160" />
                  </ContentLoader>
                  <ContentLoader
                    style={{ marginLeft: "10px", gap: "15px" }}
                    speed={2}
                    width={340}
                    height={180}
                    backgroundColor={"#666666"}
                    foregroundColor={"#999"}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="200" height="17" />
                    <rect x="0" y="30" rx="3" ry="3" width="200" height="17" />
                    <rect x="0" y="60" rx="3" ry="3" width="200" height="17" />
                    <rect x="0" y="90" rx="3" ry="3" width="260" height="17" />
                  </ContentLoader>
                  <ContentLoader
                    style={{ marginLeft: "10px", gap: "15px" }}
                    speed={2}
                    width={340}
                    height={70}
                    backgroundColor={"#666666"}
                    foregroundColor={"#999"}
                  >
                    <rect x="0" y="0" rx="3" ry="3" width="150" height="17" />
                    <rect x="0" y="30" rx="3" ry="3" width="320" height="20" />
                  </ContentLoader>
                </div>
              ))
            : creatorEvents.map((creatorEvent) => (
                <Post
                  key={creatorEvent._id}
                  description={creatorEvent.description}
                  image={creatorEvent.image}
                  date={creatorEvent.date}
                  name={creatorEvent.creator.name}
                  location={creatorEvent.location}
                  eventName={creatorEvent.eventName}
                  participants={creatorEvent.participants?.length}
                  View={
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/SingleEvent/${creatorEvent._id}`}
                    >
                      <Button
                        btnText="View Single Event"
                        type={ButtonTypes.CREATE}
                      />
                    </Link>
                  }
                />
              ))}
        </div>
      )}

      {activeTab === "participants" && (
        <div className={classes.grid}>
          {participantEvents.map((participantEvent) => (
            <Post
              key={participantEvent._id}
              description={participantEvent.description}
              image={participantEvent.image}
              date={participantEvent.date}
              participants={participantEvent.participants?.length}
              location={participantEvent.location}
              eventName={participantEvent.eventName}
              name={
                participantEvent.creator && participantEvent.creator.name
                  ? participantEvent.creator.name
                  : "No creator available"
              }
              View={
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/SingleEvent/${participantEvent._id}`}
                >
                  <Button
                    btnText="View Single Event"
                    type={ButtonTypes.CREATE}
                  />
                </Link>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SingleUser;
