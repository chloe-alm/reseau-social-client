import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import NavBar from "../../molecules/NavBar";
import PostCard from "../../molecules/postcard";
import Footer from "../Footer/Footer";

require("../EventPatch/_eventPatch.scss");



export default function EventPatch(props) {
  const token = localStorage.getItem("token");
  const alert = useAlert();
  const user = localStorage.getItem("user");
  const { id } = useParams();
  const history = useHistory();

  const [updateEvent, setUpdateEvent] = useState({
     title:"",
     content:"",
     hashtag:"",
     isSubmitting: false,
     errorMessage: null,


  });
 console.log(updateEvent)
  const handleChange = (event) => {
    setUpdateEvent({ ...updateEvent, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setUpdateEvent({
        ...updateEvent,
        isSubmittting: true,
      });
       await Axios({
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `http://localhost:8001/api/events/${id}`,
        data: JSON.stringify(updateEvent),
        
      });
      
      history.push("./");
      alert.show('Evenement modifié!')
    }
    catch (error) {
      setUpdateEvent({
        ...updateEvent,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };



  return (
    <div className="containerEvent">
     < NavBar /><br></br><br></br>
      <h2>Modification de l'évenement</h2><br></br>

      <form method="PATCH" action="/events" onSubmit={handleSubmit}>
        <p className="containerEvent_titre">Titre :</p>
        <textarea
          type="text"
          name="title"
          id="title"
          value={updateEvent.title}
          onChange={handleChange}
        ></textarea>

        <p className="containerEvent_contenu">Contenue :</p>
        <textarea
          type="text"
          name="content"
          id="content"
          value={updateEvent.content}
          onChange={handleChange}
        ></textarea>

        <p className="containerEvent_hashtag">hashtag :</p>
        <textarea
          type="text"
          name="hashtag"
          id="hashtag"
          value={updateEvent.hashtag}
          onChange={handleChange}
        ></textarea>
        <p>{updateEvent.errorMessage}</p>
        <button
          type="button"
          className="containerEvent_bouton"
          onClick={handleSubmit}
        >
          Envoyer
        </button> 
        {/* <button
          type="submit"
          className="containerProfil_boutonSupprimer"
          onClick={handleSubmit}
        >
          Supprimer
        </button>

        <h2 className="containerProfil_titrePost">Mes posts :</h2>
        {list.map((post) => {
          return (
            <div>
              <PostCard post={post} key={post.id} />
            </div>
          );
        })} */}
      </form>
      {/* <Footer/> */}
    </div>
  );
}
