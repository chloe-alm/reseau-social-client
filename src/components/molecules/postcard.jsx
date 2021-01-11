import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import poucelike from "../../assets/images/like.png";
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
        url: `http://localhost:8001/api/posts-like/${post.id}`,
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
      <div className="postCard_info">
        <Link className="postCard_info_link" to={`/posts/${post.id}`}>
          <div className="postCard_info_link_circle">
            {`${post.User.firstName}`.substring(0,1)}.{`${post.User.lastName}`.substring(0,1)}
          </div>
          <p>{post.User.firstName} {post.User.lastName}</p>
        </Link>
      </div>
      
      <div className="postCard_contenu">
        <Link className="postCard_contenu_link" to={`/posts/${post.id}`}>
          <p className="postCard_contenu__link_content">{post.content}</p>
        </Link>
    
        <div className="postCard_contenu_bottom">
          <p className="postCard_contenu_bottom_hashtag">#{post.hashtag}</p>
          <form
          className="postCard_contenu_bottom_form"
          method="PATCH"
          action="/posts"
          onSubmit={handleSubmit}
          >
            <button type="submit" className="postCard_contenu_bottom_form_like" onClick={handleSubmit}>
            <p>{count.like} </p>
            <img 
            src={poucelike} 
            alt="image du like"/>
            </button>
          </form>
        </div>
      </div>
      
    </div>
    
  );
}
