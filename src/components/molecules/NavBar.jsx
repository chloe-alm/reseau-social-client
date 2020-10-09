import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import imagecentre from "../../assets/images/centre.png";

require("./_navBar.scss");

export default function NavBar() {
  return (
    <div className="navBar">
      <img className="navBar_logo" src={logo} alt="logo" />

      <div className="navBar_boutons media_phone">
        <button className="navBar_boutons_boutonregister media_phone">
          <Link to="/register">S'inscrire</Link>
        </button>
        <button className="navBar_boutons_boutonlogin media_phone">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </div>
  );
}
