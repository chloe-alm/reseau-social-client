import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import NavBar from "../../molecules/NavBar";
import PostCard from "../../molecules/postcard";
import Footer from "../../organisms/Footer/Footer";

require("./_profil.scss");



export function Profil(props) {
  const token = localStorage.getItem("token");
  const alert = useAlert();
  const user = localStorage.getItem("user");

  const [updateUser, setUpdateUser] = useState(
   []
  );
  const handleChange = (event) => {
    setUpdateUser({ ...updateUser, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setUpdateUser({
        ...updateUser,
        isSubmittting: true,
      });
      const result = await Axios({
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `http://localhost:8001/api/register/${user}`,
        data: JSON.stringify(updateUser),
      });
    }
    catch (error) {
      setUpdateUser({
        ...updateUser,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };



  return (
    <div className="containerProfil">
     < NavBar />
      <h2 className="containerProfil_titre">Modification du profil</h2>

      <form method="PATCH" action="/profil" onSubmit={handleSubmit}>
        <p>Prénom :</p>
        <input
          type="text"
          name="firstName"
          id="firstName"
          value={updateUser.firstName}
          onChange={handleChange}
        ></input>

        <p>Nom :</p>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={updateUser.lastName}
          onChange={handleChange}
        ></input>

        <p>Email :</p>
        <input
          type="email"
          name="email"
          id="email"
          value={updateUser.email}
          onChange={handleChange}
        ></input>
        <p>{updateUser.errorMessage}</p>
        {/* <button
          type="button"
          className="containerProfil_boutonModifier"
          onClick={redirectModif}
        >
          Modifier
        </button> */}
        <button
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
        })}
      </form>
      {/* <Footer/> */}
    </div>
  );
}
