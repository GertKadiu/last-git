import axios from "axios";
import classes from "./Home.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
// import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
// import { DeleteUser } from "../hooks/Action";
import Avatar from "@mui/material/Avatar";
import PaginationRounded from "../components/Pagination/Pagination";
import Navbar from "../components/Navbar";
import PrimarySearchAppBar from "../components/Search/Search";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import Button from "../UI/Button/Button";
import { ButtonTypes } from "..//UI/Button/ButtonTypes";
import ContentLoader from "react-content-loader";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://finally-nu2d.onrender.com/")
      .then((result) => {
        setUsers(result.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCreate = () => {
    navigate("/Create");
  };

  const filteredPostsBySearch = users.filter((user) =>
    user.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const reversedPosts = [...filteredPostsBySearch].reverse();

  const numPages = Math.ceil(filteredPostsBySearch.length / usersPerPage);
  const LastUser = currentPage * usersPerPage;
  const FirstUser = LastUser - usersPerPage;
  const currentUsers = reversedPosts.slice(FirstUser, LastUser);

  return (
    <div className={classes.contanier}>
      <div className={classes.navbar}>
        <Navbar />
      </div>
      <div className={classes.title}>
        <div className={classes.upcoming}>All Profiles</div>
        <div className={classes.serach}>
          <PrimarySearchAppBar
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
          />
          <Button
            type={ButtonTypes.EDIT}
            onClick={() => handleCreate()}
            btnText=" + Create Profile"
          />
        </div>
      </div>
      <div className={classes.text}>
        <div className={classes.counter}>Total profiles: {users.length}</div>
      </div>
      <div className={classes.wrapProfile}>
        {isLoading
          ? currentUsers.map((User) => (
              <div key={User._id} className={classes.background}>
                <ContentLoader
                  style={{ marginTop: "30px", marginLeft: "10px" }}
                  height={100}
                  speed={2}
                  backgroundColor={"#666666"}
                  foregroundColor={"#999"}
                >
                  <rect x="0" y="0" rx="50" ry="50" width="70" height="70" />
                  <rect x="80" y="17" rx="4" ry="4" width="70" height="13" />
                  <rect x="80" y="40" rx="3" ry="3" width="150" height="10" />
                </ContentLoader>
              </div>
            ))
          : currentUsers.map((User) => (
              <div key={User._id} className={classes.background}>
                <Avatar
                  as={Link}
                  to={`/SingleUser/${User._id}`}
                  style={{
                    height: "60px",
                    width: "60px",
                    marginRight: "16px",
                    marginLeft: "20px",
                  }}
                  src={User.image}
                />
                <div className={classes.name}>
                  <Link to={`/SingleUser/${User._id}`} className={classes.link}>
                    {User.name}
                  </Link>
                  <div className={classes.email}> {User.email}</div>
                </div>
                <Link to={`/SingleUser/${User._id}`} className={classes.icon}>
                  <PlayArrowRoundedIcon />
                </Link>
              </div>
            ))}
      </div>
      <PaginationRounded
        totalUsers={numPages}
        usersPerPage={1}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
export default Home;
