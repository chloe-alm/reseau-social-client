import React from "react";
import { Link } from "react-router-dom";
import likelogo from "../../assets/images/like.png";
import PostPatch from "../organisms/PostCrud/postPatch";
import { useEffect, useState } from "react";
import Axios from "axios";
// import { Link } from "react-router-dom";
require("./_postcard.scss");

export default function PostCard({ post }) {
  const token = localStorage.getItem("token");
  const [count, setCount] = useState({
    like: post.like,
    isSubmitting: false,
    errorMessage: null,
  });

  // const handleChange = (event) => {
  //   setCount({ ...count, [event.target.name]: event.target.value });
  // };

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
      // if (result.status === 201) {
      //   setCount(result.data.changedPost)

      // }
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
        <Link className="containerList_link" to={`/posts/${post.id}`}>
          <img src={post.picture} alt="aperçu de l'image" />
        </Link>
      </div>
      <div className="postCard_contenu">
        <Link className="containerList_link" to={`/posts/${post.id}`}>
          <p className="postCard_contenu_content">Le contenu: {post.content}</p>
        </Link>
        {/* <button className="postCard_contenu_like" onClick={()=>setCount(count+1)}>
          <img 
          src={likelogo} 
          alt="image du like"/>• {post.like}</button> */}

        <form
          className="postCard_contenu_form"
          method="PATCH"
          action="/posts"
          onSubmit={handleSubmit}
        >
          {/* <p>TESt{count.like}</p> */}
          {/* <input
           type="text"
           name="like"
           id="like"
           value={count.like}
           onChange={handleChange}>

           </input> */}

          <button type="submit" className="postCard_contenu_like" onClick={handleSubmit}>
          {count.like} <img 
          src={likelogo} 
          alt="image du like"/>
          </button>
        </form>
      </div>
    </div>
  );
}
