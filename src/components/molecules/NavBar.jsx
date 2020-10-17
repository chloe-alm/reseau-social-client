import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import imagecentre from "../../assets/images/centre.png";
import { useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useEffect } from "react";
import logohome from "../../assets/images/home.png";
import logopost from "../../assets/images/iconpost.png";
import listpost from "../../assets/images/list.png";
import profil from"../../assets/images/user.png";
import contact from"../../assets/images/email.png";
import logout from "../../assets/images/logout.png";
import postlogo from "../../assets/images/iconpost.png";
import iconcontact from "../../assets/images/iconcontact.png";
require("./_navBar.scss");

export default function NavBar() {
  const { state } = useContext(AuthContext);

  useEffect(() => {
    console.log(state);
    return () => {};
  }, [state]);

  if (state.isAuthenticated === true) {
    return (
      <>
     
      <section className="navBar_connecter">
       
              <button className="navBar_connecter_button">
              <img className="navBar_connecter_button_logo" src={logohome} alt="logo home"/>
             
              <Link className="navBar_connecter_button_logo_link"to="/">home</Link>
              </button>

              <button className="navBar_connecter_button">
              <img className="navBar_connecter_button_logo" src={contact} alt="logo post" />
              <Link className="navBar_connecter_button_logo_link"to="/post">Post</Link>
              </button>

              <button className="navBar_connecter_button">
              <img className="navBar_connecter_button_logo" src={listpost} alt="logo liste post" />
              <Link className="navBar_connecter_button_logo_link"to="/Listpost">Liste</Link>
              </button>

              <button className="navBar_connecter_button">
              <img className="navBar_connecter_button_logo" src={profil} alt="logo profil" />
              <Link className="navBar_connecter_button_logo_link" to="/profil">Profil</Link>
              </button>

              <button className="navBar_connecter_button">
              <img className="navBar_connecter_button_logo" src={contact} alt="logo contact" />
              <Link className="navBar_connecter_button_logo_link"to="/contact">Contact</Link>
              </button>

              <button className="navBar_connecter_button">
              <img className="navBar_connecter_button_logo" src={logout} alt="logo deconnextion" />
             <Link className="navBar_connecter_button_logo_link"to="/logout">Logout</Link>
              </button> 
            
        
        </section>
        </>
    )
      
  }
  return (
    <div className="navBar">
      <img className="navBar_logo" src={logo} alt="logo" />

      <div className="navBar_logo_boutons media_phone">
        <button className="navBar_logo_boutons_boutonregister media_phone">
          <Link to="/register">S'inscrire</Link>
        </button>
        <button className="navBar_logo_boutons_boutonlogin media_phone">
          <Link to="/login">Login</Link>
        </button>
      </div>
    </div>
  );
}
