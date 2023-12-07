import classes from "./Events.module.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PaginationRounded from "../components/Pagination/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import PrimarySearchAppBar from "../components/Search/Search";
import { format } from "date-fns";
import Post from "../components/Post/Post"
import Navbar from "../components/Navbar"
import Button from "../UI/Button/Button"
import { ButtonTypes } from "../UI/Button/ButtonTypes";
import ContentLoader from "react-content-loader";

const EventPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 6;

  useEffect(() => {
    axios
      .get("https://finally-nu2d.onrender.com/Events")
      .then((result) => {
        setPosts(result.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredPostsBySearch = posts.filter((post) =>
    post.location.toLowerCase().includes(searchInput.toLowerCase())
  );

  const reversedPosts = [...filteredPostsBySearch].reverse();

  const numPages = Math.ceil(filteredPostsBySearch.length / postsPerPage);

  const firstPostIndex = (currentPage - 1) * postsPerPage;
  const lastPostIndex = firstPostIndex + postsPerPage;
  const currentPosts = reversedPosts.slice(firstPostIndex, lastPostIndex);

  const handleCreateEvents = () => {
    navigate("/CreateEvents");
  };

  return (
    <div className={classes.contanier}>
      <div className={classes.navbar}>
        <Navbar />
      </div>
      <div className={classes.title}>
        <div className={classes.upcoming}>Upcoming Events</div>
        <div className={classes.serach}>
          <PrimarySearchAppBar
            onChange={handleInputChange}
            value={searchInput}
          />
          <Button
            type={ButtonTypes.EDIT}
            onClick={() => handleCreateEvents()}
            btnText=" + Create Event"
          />
        </div>
      </div>
      <div className={classes.text}>
        <div className={classes.counter}>Total Events: {posts.length}</div>
      </div>
      <div className={classes.grid}>
        {isLoading
          ? currentPosts.map((post) => (
              <div
                key={post._id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#1E1D23",
                }}
              >
                <ContentLoader
                  key={post._id}
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
          : currentPosts.map((post) => (
              <Post
                key={post._id}
                image={post.image}
                location={post.location}
                participants={post.participants?.length}
                description={post.description}
                date={format(new Date(post.date), "d MMM - h:mm ")}
                name={post.creator ? post.creator.name : "No creator available"}
                eventName={post.eventName}
                View={
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/SingleEvent/${post._id}`}
                  >
                    <Button type={ButtonTypes.CREATE} btnText="View Event" />
                  </Link>
                }
              />
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

export default EventPage;
