import React, { useEffect, useState } from "react";
import Axios from "axios";
// import { Link, Redirect } from "react-router-dom";
import { useParams, Link } from "react-router-dom";
import logo from "../../../assets/images/logo.png";


export default function PostGet({post, errorForm}) {
  
  // const token = localStorage.getItem("token");
  // let { id } = useParams();

  // const [post, setPost] = useState({});
  // const [errorForm, setErrorForm] = useState(" ");

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await Axios({
  //         method: "get",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         url: `http://localhost:8001/api/posts/${id}`,
  //       });
  //       if (result.data) {
  //         console.log(result.data)
  //         setPost(result.data.post);
  //       }
  //     } catch (error) {
  //       setErrorForm(error);
  //     }
  //   };
  //   fetchData();
  // }, [id, token]);
  return (
    <div className="containerOnePost">
        <img className="navBar_logo" src={logo} alt="logo" />
      <div>{errorForm}</div>
      <form className="containerOnePost_contenu">
      <div className="containerOnePost_contenu_content">{post.content}</div>
      <div className="containerOnePost_contenu_like">{post.like}</div>
      <div className="containerOnePost_contenu_picture">{post.picture}</div>
      </form>
      <button className="containerOnePost_contenu_button" name="Modifier"></button>
    </div>
  );
}
