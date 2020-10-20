import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../../assets/images/logo.png";
import PostPatch from "./postPatch";

export function PostDelete({ post }) {
  const token = localStorage.getItem("token");
  const history = useHistory();

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
        return history.push("/posts");
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
      console.log(testModifie)
    return <div><PostPatch datapost={post} /></div>;
  } else {
    return (
      <>
        <h2 className="postDelete">Voulez vous supprimer votre post? </h2>
        <form method="DELETE" action="/posts" onSubmit={handleSubmit}>
          <img className="navBar_logo" src={logo} alt="logo" />

          <div className="containerOnePost_contenu">
            <div className="containerOnePost_contenu_content">
              contenu : {post.content}
            </div>
            <div className="containerOnePost_contenu_like">
              likes: {post.like}
            </div>
            <div className="containerOnePost_contenu_picture">
              Photo : {post.picture}
              id : {post.id}
            </div>
            <div>{deletePost.errorMessage}</div>
            <button
              type="submit"
              className="postDelete_bouton"
              onClick={handleSubmit}
            >
              supprimer
            </button>
          </div>
        </form>
        <button type="button" onClick={redirectModif}>
          Modifier
        </button>
      </>
    );
  }
}
