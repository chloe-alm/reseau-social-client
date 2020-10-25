import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import PostPatch from "./postPatch";
import Footer from "../../organisms/Footer/Footer";
import imgtrois from "../../../assets/images/trois.png";
import NavBar from "../../molecules/NavBar";
import { useAlert } from 'react-alert';
require("./_postDelete.scss");
export function PostDelete({ post }) {
  const token = localStorage.getItem("token");
  const history = useHistory();
  const alert = useAlert();
  const [deletePost, setDeletePost] = useState({
    content: post.content,
    like: post.like,
    picture: post.picture,
    isSubmitting: false,
    errorMessage: null,
  });
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setDeletePost({
        ...deletePost,
        isSubmitting: true,
      });
      const result = await Axios({
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `http://localhost:8001/api/posts/${post.id}`,
        data: JSON.stringify(deletePost),
      });
      console.log(result);
      if (result.status === 201) {
        console.log("delete", deletePost);
        return alert.show("Post bien supprimé"),history.push("/posts");
      }
    } catch (error) {
      setDeletePost({
        ...deletePost,
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
    return (
      <div>
        <PostPatch datapost={post} />
      </div>
    );
  } else {
    return (
      <div className="container">
        <NavBar/>
        <h2 className="container_titre">
          Voulez vous modifier/supprimer votre post?{" "}
        </h2>
        
        <form
          method="DELETE"
          action="/posts"
          className="container_OnePost"
          onSubmit={handleSubmit}
        >
          <img
            className="container_OnePost_image"
            src={imgtrois}
            alt="trois chevaux"
          />

          <div className="container_OnePost_details">
            <div className="containerOnePost_details_content">
              <strong>Le contenu :</strong> {post.content}
            </div>
            <div className="container_OnePost_details_like">
            <strong>Likes:</strong>  {post.like}
            </div>
            
          </div>

          <div className="container_OnePost_erreur">
            {deletePost.errorMessage}
          </div>
          
         
          <button
            type="submit"
            className="container_OnePost_boutonSupprimer"
            onClick={handleSubmit}
          >
            Supprimer
          </button>
        
        <button
          type="button"
          className="container_OnePost_boutonModifier"
          onClick={redirectModif}
        >
          Modifier
        </button>
        
        </form>
      
      </div>
        
    );
  }
}
