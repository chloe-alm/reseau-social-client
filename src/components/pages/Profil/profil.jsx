import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import NavBar from "../../molecules/NavBar";
import PostCard from "../../molecules/postcard";
import Footer from "../../organisms/Footer/Footer";
import { AuthContext } from "../../../context/auth";

require("./_profil.scss");

export function Profil(props) {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  const { state } = useContext(AuthContext);
  const [list, setList] = useState([]);
  const [errorForm, setErrorForm] = useState(" ");
  const alert = useAlert();
  let { id } = useParams();

  const [infoUser, setInfoUser] = useState({
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
     < NavBar /><br></br>
      <h2 className="containerProfil_titre">Informations du profil</h2>
      <p className="containerProfil_para"> 
      Nom:{state.user && state.user.firstName} <br></br>
      Prénom: {state.user && state.user.lastName}<br></br>
      Email: {state.user && state.user.email}<br></br>
      Country: {state.user && state.user.country}<br></br>
    
      </p>
        {/* <p>{infoUser.errorMessage}</p> */}
       <Link to={`/register/${user}`}> <button
          type="button"
          className="containerProfil_bouton"
        
        >
          Modifier
        </button>
        </Link>

        <h2 className="containerProfil_titrePost">Mes posts :</h2>
        {list.map((post) => {
          return (
            <div>
              <PostCard post={post} key={post.id} />
            </div>
          );
        })}
      {/* </form> */}
      {/* <Footer/> */}
    </div>
  );
}