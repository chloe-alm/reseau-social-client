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
  const user = localStorage.getItem("user");
  const [list, setList] = useState([]);
  const [errorForm, setErrorForm] = useState(" ");
  const alert = useAlert();
  let { id } = useParams();

  let [infoUser, setInfoUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    isSubmitting: false,
    errorMessage: null,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const axiosData = async () => {
      try {
        const result = await Axios({
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          url: `http://localhost:8001/api/user/${user}`,
        });
        if (result.data) {
          setInfoUser({
            ...infoUser,
            firstName: result.data.userFound.firstName,
            lastName: result.data.userFound.lastName,
            email: result.data.userFound.email,
            isAdmin: result.data.userFound.isAadmin,
          });
        }
      } catch (error) {
        setError(error.response.data.description);
      }
    };
    axiosData();
  }, [token, user]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Axios({
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          url: `http://localhost:8001/api/user-posts`,
        });
        if (result.data) {
          setList(result.data.post);
        }
      } catch (error) {
        setErrorForm(error.response.data.description);
      }
    };
    fetchData();
  }, [token]);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setInfoUser({
      ...infoUser,
      [name]: value,
    });
  };

  let handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setInfoUser({
        ...infoUser,
        errorMessage: null,
        isSubmitting: true,
      });
      const result = await Axios({
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `http://localhost:8001/api/user/${user}`,
        data: JSON.stringify(infoUser),
      });
      if (result.status === 201) {
        return alert.show("Les informations sont modifiées");
      }
    } catch (error) {
      setInfoUser({
        ...infoUser,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };
  let [testModifie, setTestModifie] = useState(false);
  const redirectModif = () => {
    setTestModifie(true);
  };
  if (testModifie === true) {
    console.log(testModifie);
  }

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
          value={infoUser.firstName}
          onChange={handleChange}
        ></input>

        <p>Nom :</p>
        <input
          type="text"
          name="lastName"
          id="lastName"
          value={infoUser.lastName}
          onChange={handleChange}
        ></input>

        <p>Email :</p>
        <input
          type="email"
          name="email"
          id="email"
          value={infoUser.email}
          onChange={handleChange}
        ></input>
        <p>{infoUser.errorMessage}</p>
        <button
          type="button"
          className="containerProfil_boutonModifier"
          onClick={redirectModif}
        >
          Modifier
        </button>
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
