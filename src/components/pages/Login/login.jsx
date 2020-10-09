import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

// import cheval from "../../../assets/images/cheval.png";
import randonne from "../../../assets/images/randonne.png";
import Axios from "axios";
// import submitBtn from "../../atomes/SubmitBtn"

require("./_login.scss");

export default function Login(props) {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [redirect, setRedirect] = useState(false);

  const [errorForm, setErrorForm] = useState(" ");

  const handleChange = (event) => {
    setLogin({ ...login, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios({
      method: "post",
      headers: { "Content-Type": "application/json" },
      url: "http://localhost:8001/api/login",
      data: JSON.stringify(login),
    })
      // .post('http://localhost:8001/api/login', login)
      .then((res) => {
        console.log("#888", res);
        localStorage.setItem("token", res.data.token);
        setLogin({ email: "", password: "" });
        props.setIsOpen(false);
        setRedirect(true);
      })
      .catch((error) => {
        console.log("#999", error.res);
        console.log("#999", typeof error);
        // setErrorForm(error.res.data.error)
        // return response.status(500).json({
        //     'error': "Impossible de faire cela"
        // })
      });
  };
  if (redirect) {
    return <Redirect to="profil" />;
  } else {
    return (
      <div className="ContainerLog media_phone">
        <div className="ContainerLog_header">Login</div>
        <div className="ContainerLog_content">
          <div className="ContainerLog_content_image">
            <img src={randonne} alt="cheval" />
          </div>
        </div>
        <div className="ContainerLog_form">
          <div
            className="ContainerLog_form_group"
            method="POST"
            action="/login"
            onSubmit={handleSubmit}
          >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={login.email}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="ContainerLog_form_group">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              value={login.password}
              onChange={handleChange}
              required
            ></input>
          </div>
        </div>
        <div className="bouton">
          <button type="button" className="btn" onClick={handleSubmit}>
            Se connecter
          </button>
        </div>
        <div>{errorForm}</div>
      </div>
    );
  }
}
