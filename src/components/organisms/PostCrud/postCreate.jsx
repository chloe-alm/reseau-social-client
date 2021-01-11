import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
require("./_postCreate.scss");
export default function PostCreate() {
  const history = useHistory();
  const token = localStorage.getItem("token");

  const [createPost, setCreatePost] = useState({
    content: null,
    hashtag:"",
    isSubmitting: false,
    errorMessage: null,
  });

  const handleChange = (event) => {
    setCreatePost({ ...createPost, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setCreatePost({
        ...createPost,
        isSubmitting: true,
      });
      const result = await Axios({
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: "http://localhost:8001/api/posts",
        data: JSON.stringify(createPost),
      });

      if (result.status === 201) {
        return history.push("./posts");
      }
    } catch (error) {
      setCreatePost({
        ...createPost,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };

  return (
    <div className="container">
      <form
        className="container_postCreate"
        method="POST"
        action="/posts"
        onSubmit={handleSubmit}
      >
       
        <div className="container_postCreate_content">
          <p>Le contenu : </p>
         
          <textarea
          type="text"
            name="content"
            id="content"
            rows="10"
            cols="10"
            placeholder="texte"
            value={createPost.content}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="container_postCreate_hashtag">
          <p>Hashtag: </p>
          <input
            type="text"
            name="hashtag"
            id="hashtag"
            placeholder="#hashtag"
            value={createPost.hashtag}
            onChange={handleChange}
          ></input>
        </div>

        <div className="container_postCreate_erreur">{createPost.errorMessage}</div>

        <button
          type="submit"
          className="container_postCreate_button"
          onClick={handleSubmit}
        >
          Créer
        </button>
      </form>
    </div>
  );
}
