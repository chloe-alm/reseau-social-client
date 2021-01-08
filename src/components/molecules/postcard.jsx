import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import poucelike from "../../assets/images/poucelike.png";
import PostPatch from "../organisms/PostCrud/postPatch";
import { useEffect, useState } from "react";
import Axios from "axios";
import Footer from "../organisms/Footer/Footer";
import { AuthContext } from "../../context/auth";
require("./_postcard.scss");

export default function PostCard({ post }) {
  const token = localStorage.getItem("token");
  const { state } = useContext(AuthContext);
  const [count, setCount] = useState({
    like: post.like,
    isSubmitting: false,
    errorMessage: null,
  });
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setCount({
        like: count.like + 1,
        isSubmittting: true,
      });
      const result = await Axios({
        method: "patch",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `http://localhost:8001/api/posts/${post.id}`,
        data: JSON.stringify(count),
      });
    } catch (error) {
      setCount({
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };

  return (
    
    <div className="postCard" key={post.id}>
      <div className="postCard_image">
        <Link className="postCard_link" to={`/posts/${post.id}`}>
          <img src={post.picture} alt="aperçu de l'image" />
        </Link>
      </div>
      <div className="postCard_contenu">
        <Link className="postCard_contenu_link" to={`/posts/${post.id}`}>
          <p className="postCard_contenu_content"> <strong>Le contenu: </strong> {post.content}</p>
        </Link>
    

       <form
        className="postCard_contenu_form"
        method="PATCH"
        action="/posts"
        onSubmit={handleSubmit}
      >

        <button type="submit" className="postCard_contenu_like" onClick={handleSubmit}>
        {count.like} <img 
        src={poucelike} 
        alt="image du like"/>
        </button>
      </form>
      </div>
      
    </div>
    
  );
}
