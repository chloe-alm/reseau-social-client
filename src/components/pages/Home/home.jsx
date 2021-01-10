import React, { useContext } from "react";
import NavBar from "../../molecules/NavBar";
import "./_home.scss";
import Footer from "../../organisms/Footer/Footer";
import { AuthContext } from "../../../context/auth";
import cheval from "../../../assets/images/cheval.png";
import Slide from  "../../molecules/Slide";
import ListEvent from  "../../organisms/ListEvent/listEvent";


export default function Home(props) {
  const { state } = useContext(AuthContext);
  return (
    <div className="home ">

      <NavBar />

      <h2 className="home_titre ">
        Bienvenue
        <span> {state.user && state.user.firstName.toUpperCase()}</span>
      </h2>
      <img
        className="home_image"
        src={cheval}
        alt="image du centre equestre"
      />
      <p className="home_paragraphe">
        Le centre équestre de Jablines et ses 5 Hectares, vous accueille à
        l'ouest de la Seine et Marne, à 10 Km du parc Disneyland et à 30 min par
        l'A4 de la porte de BERCY.
        <br />
        <br />
        L'équipe du centre équestre vous reçoit pour vous proposer une
        équitation Sportive ou de Loisir dans une structure de qualité.
        <br />
        <br />A cheval ou à poney, du débutant au cavalier confirmé, vous
        pourrez profiter du cadre de l'île de loisirs pour pratiquer notre sport
        en relation avec cet être sensible qu'est le cheval et ainsi en
        apprécier tous ses aspects.
      </p>
      {/* <Slide /> */}
      <ListEvent/>
      <p className="home_paragrapheinfo ">
        Vous pouvez contacter le Secrétariat au :<br />
        <strong>01 60 26 49 99</strong> <br />
        du lundi au vendredi de 9h30 à 12h30 et de 14h à 18h et le samedi
        après-midi (permanence)
      </p>
      <Footer/>
    </div>
  );
}
