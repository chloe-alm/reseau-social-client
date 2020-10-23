import React, { useEffect, useState } from "react";
import Axios from "axios";
import PostDelete from "../../organisms/PostCrud/postDelete";
import { useHistory } from "react-router-dom";
import NavBar from "../../molecules/NavBar";
import horse from "../../../assets/images/horse.png";
import Footer from "../Footer/Footer";
require("./_postPatch.scss");

export default function PostPatch({ datapost }) {
  const token = localStorage.getItem("token");
  const history = useHistory();
  // const token = localStorage.getItem("id")
  //faire la focntion userid correspond au userid token
  let [post, setPost] = useState({
    content: datapost.content,
    like: datapost.like,
    picture: datapost.picture,
    isSubmitting: false,
    errorMessage: null,
  });
  const handleChange = (event) => {
    setPost({ ...post, [event.target.name]: event.target.value });
  };

    const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        setPost({
          ...post,
          isSubmittting: true,
        });
        const result = await Axios({
          method: "patch",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          url: `http://localhost:8001/api/posts/${datapost.id}`,
          data: JSON.stringify(post),
        });
        if (result.status === 201) {
          setPost(result.data.changedPost)
          history.push("/posts")
        }
      } catch (error) {
        setPost({
          ...post,
          isSubmitting: false,
          errorMessage: error.response.data.description,
        });
      }
    };
    
  return (
    <div className="container">
      <NavBar/>
      <h2 className="container_titre">Modification du post</h2>

      <form
        className="container_postPatch"
        method="PATCH"
        action="/posts"
        onSubmit={handleSubmit}
      >
         <img
            className="container_postPatch_image"
            src={horse}
            alt="balade à cheval"
          />
        <div className="container_postPatch_content">
          <p><strong>Le contenu :</strong> </p>
          <input
            type="text"
            name="content"
            id="content"
            value={post.content}
            onChange={handleChange}
          ></input>
        </div>

        <div className="container_postPatch_like">
          <p><strong>Like :</strong> {post.like}</p>
        </div>

        <div className="container_postPatch_picture">
          <p><strong>Photos url : </strong> </p>
          <input
            type="text"
            name="picture"
            id="picture"
            value={post.picture}
            onChange={handleChange}
          ></input>
        </div>

        <div className="container_postPatch_erreur">{post.errorMessage}</div>
        <button
          type="submit"
          className="container_button"
          onClick={handleSubmit}
        >
          Modifier
        </button>
      </form>
      

      <Footer/>
    </div>
  );
}
