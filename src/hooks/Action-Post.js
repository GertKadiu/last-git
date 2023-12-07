import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import useInput from "./use-inpute";

export const CreateEvents = () => {
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [participants, setParticipants] = useState([]);
  const [date, setDate] = useState([]);
  const [imageURL, setImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const {
    value: location,
    hasError: locationInputHasError,
    isValid: locationIsValid,
    valueChangeHandler: locationChangeHandler,
    InputBlurHandler: locationBlurHandler,
  } = useInput((value) => value.trim().length > 4);

  const {
    value: creator,
    hasError: creatorInputHasError,
    isValid: creatorIsValid,
    valueChangeHandler: creatorChangeHandler,
    InputBlurHandler: creatorBlurHandler,
  } = useInput((value) => value !== "");

  const {
    value: eventName,
    hasError: eventNameInputHasError,
    isValid: eventNameIsValid,
    valueChangeHandler: eventNameChangeHandler,
    InputBlurHandler: eventNameBlurHandler,
  } = useInput((value) => value.trim().length > 4);

  const {
    value: description,
    hasError: descriptionInputHasError,
    isValid: descriptionIsValid,
    valueChangeHandler: descriptionChangeHandler,
    InputBlurHandler: descriptionBlurHandler,
  } = useInput((value) => value.trim().length <= 320);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    const imageURL = URL.createObjectURL(selectedImage);
    setImageURL(imageURL);
  };

  const formIsValid =
    eventNameIsValid && locationIsValid && descriptionIsValid && creatorIsValid;

  const onCancel = () => {
    if (
      eventName ||
      location ||
      creator ||
      description ||
      participants.length > 0
    ) {
      setShowModal(true);
    } else {
      navigate("/Events");
    }
  };

  const onConfirm = () => {
    setShowModal(false);
    navigate("/Events");
  };

  const stay = () => {
    setShowModal(false);
  };

  const handleChange = (event) => {
    const selectedParticipants = event.target.value;
    setParticipants(selectedParticipants);
  };

  const Submit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("location", location);
    formData.append("date", date);
    formData.append("creator", creator);
    formData.append("description", description);
    formData.append("image", image);
    participants.forEach((participant) => {
      formData.append("participants", participant);
    });
    axios
      .post("https://finally-nu2d.onrender.com/CreateEvents", formData)
      .then((result) => {
        console.log(result);
        setSuccess(true);
        setSuccess(false);
        setIsLoading(true);
        setTimeout(() => {
          navigate("/Events");
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
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
    creatorChangeHandler,
    creatorBlurHandler,
    creatorInputHasError,
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
    setImage,
    handleImageChange,
    imageURL,
    showModal,
    onCancel,
    onConfirm,
    stay,
  };
};

export const UpdatePost = () => {
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [creator, setCreator] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [success, setSuccess] = useState(false);
  const [participants, setParticipants] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const onCancel = () => {
    setShowModal(true);
  };

  const onConfirm = () => {
    setShowModal(false);
    navigate("/Events");
  };

  const stay = () => {
    setShowModal(false);
  };

  const handleParticipantsChange = (event) => {
    const selectedParticipants = event.target.value;
    setParticipants(selectedParticipants);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    const imageURL = URL.createObjectURL(selectedImage);
    setImageURL(imageURL);
  };

  useEffect(() => {
    axios
      .get("https://finally-nu2d.onrender.com/getPost/" + id)
      .then((result) => {
        console.log(result);
        setEventName(result.data.eventName);
        setLocation(result.data.location);
        setCreator(result.data.creator);
        setDescription(result.data.description);
        setParticipants(result.data.participants);
        setImage(null);
        setImageURL(result.data.image);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const UpdateEvent = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append("creator", creator);
    formData.append("description", description);
    participants.forEach((participant) => {
      formData.append("participants", participant);
    });
    formData.append("location", location);

    if (image) {
      formData.append("image", image); // Append the image file to the FormData
    }

    axios
      .put(`https://finally-nu2d.onrender.com/editEvent/${id}`, formData)
      .then((result) => {
        console.log(result);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigate("/Events");
        }, 500);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return {
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
  };
};

export const DeletePost = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const confirmDelete = () => {
    axios
      .delete("https://finally-nu2d.onrender.com/deletePost/" + deleteId)
      .then((res) => {
        console.log(res);
        setShowModal(false);
        setSuccess(true);
        setSuccess(false);
        navigate("/Events");
      })
      .catch((err) => console.log(err));
  };

  const handleDeletePost = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  return { confirmDelete, handleDeletePost, showModal, success, setShowModal };
};
