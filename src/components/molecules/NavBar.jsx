import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useEffect } from "react";
import logohome from "../../assets/images/home.png";
import logopost from "../../assets/images/iconpost.png";
import listpost from "../../assets/images/list.png";
import profil from "../../assets/images/user.png";
import contact from "../../assets/images/email.png";
import logout from "../../assets/images/logout.png";
import post from "../../assets/images/post.png";

require("./_navBar.scss");

export default function NavBar() {
  const { state } = useContext(AuthContext);

  const Logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  useEffect(() => {
    state.user && console.log(state.user.firstName);
    return () => {};
  }, [state]);
  if (state.isAuthenticated === true) {
    return (
      <>
        <section className="navBar_connecter">
          <Link className="navBar_connecter_link" to="/">
          <p>Home</p>
            <button className="navBar_connecter_button">
              <img
                className="navBar_connecter_button_logo"
                src={logohome}
                alt="logo post"
              />
            </button>
          </Link>
          {
            state.isAdmin ?(
              <Link className="navBar_connecter_link" to="/events">
            <p>Events</p>
            <button className="navBar_connecter_button">
              <img
                className="navBar_connecter_button_logo"
                src={post}
                alt="logo post"
              />
            </button>
          </Link>
            ):(  <div></div>
            )
          }
         

          <Link className="navBar_connecter_link" to="/posts">
            <p>Liste Post</p>
            <button className="navBar_connecter_button">
              <img
                className="navBar_connecter_button_logo"
                src={listpost}
                alt="logo liste post"
              />
            </button>
          </Link>

          <Link className="navBar_connecter_link" to="/profil">
            <p>Profil </p>
            <button className="navBar_connecter_button">
              <img
                className="navBar_connecter_button_logo"
                src={profil}
                alt="logo profil"
              />
            </button>
          </Link>

          <Link className="navBar_connecter_link" to="/contact">
            <p>Contact</p>
            <button className="navBar_connecter_button">
              <img
                className="navBar_connecter_button_logo"
                src={contact}
                alt="logo contact"
              />
            </button>
          </Link>

          <button
            className="navBar_connecter_button"
            onClick={() => {
              Logout();
            }}
          >
            <img
              className="navBar_connecter_button_logo"
              src={logout}
              alt="logo deconnexion"
            />
            <Link className="navBar_connecter_button_logo_link" to="/logout">
              <p>Logout</p>
            </Link>
          </button>
        </section>
      </>
    );
  }
  return (
    <div className="navBar">
      <img className="navBar_logo" src={logo} alt="logo" />

      <div className="navBar_boutons">
        <button className="navBar_boutons_register media_phone">
          <Link className="navBar_link" to="/register">
            S'inscrire
          </Link>
        </button>
        <button className="navBar_boutons_login media_phone">
          <Link className="navBar_link" to="/login">
            Se connecter
          </Link>
        </button>
      </div>
    </div>
  );
}
