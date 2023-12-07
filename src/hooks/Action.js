import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import useInput from "./use-inpute";

export const CreateUser = () => {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {
    value: email,
    hasError: emailInputHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    InputBlurHandler: emailBlurHandler,
  } = useInput((value) =>
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)
  );

  const {
    value: name,
    hasError: nameInputHasError,
    isValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    InputBlurHandler: nameBlurHandler,
  } = useInput((value) => value.trim().length > 2);

  const {
    value: age,
    hasError: ageInputHasError,
    isValid: ageIsValid,
    valueChangeHandler: ageChangeHandler,
    InputBlurHandler: ageBlurHandler,
  } = useInput((value) => /^\d+$/.test(value) && parseInt(value) <= 100);

  const handleNameError = () => {
    console.error("Name is required or invalid");
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    const imageURL = URL.createObjectURL(selectedImage);
    setImageURL(imageURL);
  };

  const formIsValid = nameIsValid && ageIsValid && emailIsValid;

  const onCancel = () => {
    if (!(name || age || email)) {
      navigate("/");
    } else {
      setShowModal(true);
    }
  };

  const onConfirm = () => {
    setShowModal(false);
    navigate("/");
  };

  const stay = () => {
    setShowModal(false);
  };

  const Submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("age", age);
    formData.append("image", image);

    axios
      .post("https://finally-nu2d.onrender.com/createUser", formData)
      .then((result) => {
        console.log(result);
        setSuccess(true);
        setIsLoading(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        setError(true);
        setError(false);
      });
  };

  return {
    Submit,
    error,
    success,
    name,
    email,
    age,
    image,
    formIsValid,
    handleNameError,
    setImage,
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
  };
};

export const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const onCancel = () => {
    setShowModal(true);
  };

  const onConfirm = () => {
    setShowModal(false);
    navigate("/");
  };

  const stay = () => {
    setShowModal(false);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    const imageURL = URL.createObjectURL(selectedImage);
    setImageURL(imageURL);
  };

  useEffect(() => {
    axios
      .get("https://finally-nu2d.onrender.com/getUser/" + id)
      .then((result) => {
        console.log(result);
        setName(result.data.name);
        setEmail(result.data.email);
        setAge(result.data.age);
        setImage(null);
        setImageURL(result.data.image);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const Update = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("age", age);
    formData.append("image", image);

    axios
      .put("https://finally-nu2d.onrender.com/updateUser/" + id, formData)
      .then((result) => {
        console.log(result);
        setSuccess(true);
        setIsLoading(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/");
        }, 500);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return {
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
  };
};

export const SingleUserEvents = () => {
  const [creatorEvents, setCreatorEvents] = useState([]);
  const [participantEvents, setParticipantEvents] = useState([]);
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("events");
  const [isLoading, setIsLoading] = useState([]);

  const fetchPostsByCreator = (creator) => {
    axios
      .get(`https://finally-nu2d.onrender.com/PostsByCreator/${creator}`)
      .then((result) => {
        setCreatorEvents(result.data);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      })
      .catch((err) => console.log(err));
  };

  const fetchParticipantEvents = (participantId) => {
    axios
      .get(
        `https://finally-nu2d.onrender.com/EventsByParticipant/${participantId}`
      )
      .then((result) => setParticipantEvents(result.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (activeTab === "events") {
      fetchPostsByCreator(id);
    } else if (activeTab === "participants") {
      fetchParticipantEvents(id);
    }
  }, [id, activeTab]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return {
    creatorEvents,
    handleTabClick,
    activeTab,
    participantEvents,
    id,
    isLoading,
  };
};

export const DeleteUser = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const confirmDelete = () => {
    axios
      .delete("https://finally-nu2d.onrender.com/deleteUser/" + deleteId)
      .then((res) => {
        console.log(res);
        setShowModal(false);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteUser = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  return { confirmDelete, handleDeleteUser, showModal, setShowModal };
};
