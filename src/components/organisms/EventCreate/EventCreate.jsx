import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
require("./_eventCreate.scss");
export default function EventCreate() {
  const history = useHistory();
  const token = localStorage.getItem("token");
  const [createEvent, setCreateEvent] = useState({
    title: "",
    content: "",
    hashtag:"",
    isSubmitting: false,
    errorMessage: null,
  });
  const handleChange = (event) => {
    setCreateEvent({ ...createEvent, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setCreateEvent({
        ...createEvent,
        isSubmitting: true,
      });
      const result = await Axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: "http://localhost:8001/api/events",
        data: JSON.stringify(createEvent),
      });

      if (result.status === 201) {
        return history.push("./events");
      }
    } catch (error) {
      setCreateEvent({
        ...createEvent,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };

  return (
    <div className="container">
      <p><strong>Création d'un évènement par un administrateur :</strong></p>
      <form
        className="container_EventCreate"
        method="POST"
        action="/events"
        onSubmit={handleSubmit}
      >
       
        <div className="container_EventCreate_titre">
          <p>Le titre : </p>
          <input
            type="text"
            name="title"
            id="title"
            value={createEvent.title}
            onChange={handleChange}
          ></input>

        </div>

        <div className="container_EventCreate_content">
          <p>Le contenu :  </p>
          
            <textarea
          type="text"
            name="content"
            id="content"
            // rows="9"
            // cols="10"
            value={createEvent.content}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="container_EventCreate_hashtag">
          <p>Hashtag :  </p>
          <input
            type="text"
            name="hashtag"
            id="hashtag"
            value={createEvent.hashtag}
            onChange={handleChange}
          ></input>
        </div>

        <div className="container_eventCreate_erreur">{createEvent.errorMessage}</div>

        <button
          type="submit"
          className="container_eventCreate_button"
          onClick={handleSubmit}
        >
          Créer
        </button>
      </form>
    </div>
  );
}
