import React, { useState } from "react";
import Axios from "axios";
import { link, useHistory } from "react-router-dom";
import chevauxpre from "../../../assets/images/chevauxpre.png";
import NavBar from "../../molecules/NavBar";
import Footer from "../../organisms/Footer/Footer";
import { useAlert } from "react-alert";
// import { useAlert } from 'react-alert'
require("./_register.scss");

export default function Register(props) {
  const history = useHistory();

  const [register, setRegister] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: "",
    picture: "",
  });
  const [errorForm, setErrorForm] = useState(" ");
  const alert = useAlert();

  const handleChange = (event) => {
    setRegister({ ...register, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:8001/api/register", register)
      .then((res) => {
        setRegister({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          country: "",
          picture: "",
        });
        
        history.push("./login");
        alert.show('Inscription validée!')
      })
      .catch((error) => {
        setErrorForm(error.response.data.description);
      });
  };

  return (
    <div className="ContainerReg media_phone">
      <div className="ContainerReg_header">S'inscrire</div>
      <NavBar/>
      <div className="ContainerReg_content">
        <div className="ContainerReg_content_image">
          <img src={chevauxpre} alt="prairie avec un cheval" />
        </div>
      </div>


      <form
        methode="POST"
        className="registerForm"
        action="/register"
        onSubmit={handleSubmit}
      >
        <div className="registerForm_nom">
          <label htmlFor="firstName">Nom</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            placeholder="Nom"
            value={register.firstName}
            onChange={handleChange}
            // required
          />

          <div className="registerForm_prenom">
            <label htmlFor="lastName">Prénom</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Prénom"
              value={register.lastName}
              onChange={handleChange}
              // required
            />
          </div>
          <div className="registerForm_email">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="emailRegister"
              placeholder="exemple@gmail.com"
              value={register.email}
              onChange={handleChange}
              // required
            />
          </div>
          <div className="registerForm_password">
            <label htmlFor="password">Password avec 6 characters minimum, 1 capitale, 1 chiffre</label>
            <input
              type="text"
              id="passRegister"
              name="password"
              placeholder="Mot de passe"
              value={register.password}
              onChange={handleChange}
              
            />
          </div>
          <div className="registerForm_pays">
            <label htmlFor="country">Pays</label>
            <input
              type="text"
              name="country"
              id="country"
              placeholder="pays"
              value={register.country}
              onChange={handleChange}
              // required
            />
          </div>
          {/* <div className="registerForm_date">
            <label htmlFor="birthday">Birthday</label>
            <input
              type="date"
              name="birthday"
              id="birthday"
              value={register.birthday}
              onChange={handleChange}
             
            /> */}
          {/* </div> */}
          {/* <div className="registerForm_picture">
            <label htmlFor="picture">Photo Url </label>
            <input
              type="text"
              name="picture"
              id="picture"
              placeholder="https://exemple.com"
              value={register.picture}
              onChange={handleChange}
              // required
            />
          </div> */}
        </div>
      </form>
      <div className="registerForm_erreur">{errorForm}</div>
   
        <button type="submit" className="registerForm_bouton"onClick={handleSubmit}>
          S'inscrire
        </button>
        <Footer/>
    </div>
     
  );
}
