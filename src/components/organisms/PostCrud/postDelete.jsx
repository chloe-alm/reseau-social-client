import Axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import PostPatch from "./postPatch";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import Footer from "../../organisms/Footer/Footer";
import imgtrois from "../../../assets/images/trois.png";
import NavBar from "../../molecules/NavBar";
import { useAlert } from 'react-alert';
require("./_postDelete.scss");

export function PostDelete({ post }) {
  const token = localStorage.getItem("token");
  const { state } = useContext(AuthContext);
  const history = useHistory();
  const alert = useAlert();
  const [deletePost, setDeletePost] = useState({
    content: post.content,
    like: post.like,
    hashtag: post.hashtag,
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
      <div className="deleteContainer">
        <NavBar/>
        {
          state.user.id === post.userId ? (
        <h2 className="deleteContainer_titre">
          Voulez vous modifier/supprimer votre post?{" "}
        </h2>
        ): (
        <div></div>)
        }

        
        <form
          method="DELETE"
          action="/posts"
          className="deleteContainer_OnePost"
          onSubmit={handleSubmit}
        >
          <img
            className="deleteContainer_OnePost_image"
            src={imgtrois}
            alt="trois chevaux"
          />

          <div className="deleteContainer_OnePost_details">
            <div className="deleteContainer_OnePost_details_content">
            {post.content} 
            </div>
            <div className="deleteContainer_OnePost_details_bottom">
              <p className="deleteContainer_OnePost_details_bottom_hashtag"><strong>#{post.hashtag}</strong></p>
              <p className="deleteContainer_OnePost_details_bottom_like"><strong>Likes:</strong>  {post.like}</p>
            </div> 
          </div>

          {
            state.user.id === post.userId ? (
              <div>
                <div className="deleteContainer_OnePost_erreur">
                  {deletePost.errorMessage}
                </div>

                <button
                type="submit"
                className="deleteContainer_OnePost_boutonSupprimer"
                onClick={handleSubmit}
                >
                  Supprimer
                </button>
    
                <button
                  type="button"
                  className="deleteContainer_OnePost_boutonModifier"
                  onClick={redirectModif}
                >
                  Modifier
                </button>
              </div>
            ):(<div></div>)
            }
          
        </form>
      </div>
        
    );
  }
}
