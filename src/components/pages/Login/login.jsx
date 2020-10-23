import React, { useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

import Axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import NavBar from "../../molecules/NavBar";

import prairieCheval from "../../../assets/images/prairiecheval.png";
import Footer from "../../organisms/Footer/Footer";
require("./_login.scss");

export default function Login(props) {
  const { dispatch } = useContext(AuthContext);

  const history = useHistory();

  const [login, setLogin] = useState({
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
  });

  const [errorForm, setErrorForm] = useState(" ");

  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLogin({
        ...login,
        email: "",
        password: "",
        isSubmitting: true,
      });

      const result = await Axios({
        method: "post",
        headers: { "Content-Type": "application/json" },
        url: "http://localhost:8001/api/login",
        data: JSON.stringify(login),
      });
      if (result.status === 200) {
        return dispatch({ type: "LOGIN", payload: result }), history.push("./");
        // localStorage.setItem("token", res.data.token);
        // setLogin({ email: "", password: "" });
      }
    } catch (error) {
      console.log("error catch login", error.response);
      setLogin({
        ...login,
        isSubmitting: false,
        errorMessage: error.response,
      });
    }
  };

  return (
    <div className="ContainerLog media_phone">
      <div className="ContainerLog_header">Se connecter</div>
      <NavBar />
      <div className="ContainerLog_content">
        <div className="ContainerLog_content_image">
          <img src={prairieCheval} alt="cheval" />
        </div>
      </div>

      <form
        className="loginForm"
        method="POST"
        action="/login"
        onSubmit={handleSubmit}
      >
        <div className="loginForm_email">
          <p>Email:</p>
          <input
            type="text"
            name="email"
            id="emaillogin"
            placeholder="Email"
            value={login.email}
            onChange={handleChange}
          />
        </div>
        <div className="loginForm_password">
          <p>Password with 6 characters minimum, 1 capitale, 1 chiffre:</p>
          <input
            type="password"
            name="password"
            id="passLogin"
            placeholder="Mot de passe"
            value={login.password}
            onChange={handleChange}
          />
        </div>
        <div className="loginForm_erreur">{errorForm}</div>
        <button
          className="loginForm_bouton"
          type="submit"
          onClick={handleSubmit}
        >
          Se connecter
        </button>
        
      </form>

      <div class="loginForm_link">
        <a href="/">Mot de passe oublié ?</a> .
        <a href="/register">S'inscrire</a>
      </div>
      <Footer/>
    </div>
  );
}
