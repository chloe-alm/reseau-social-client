import React, { useEffect, useState } from "react";
import Axios from "axios";
import PostDelete from "../../organisms/PostCrud/postDelete";
import { useHistory } from "react-router-dom";


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
    <div>
      <form
        className="postPatch"
        method="PATCH"
        action="/posts"
        onSubmit={handleSubmit}
      >
        <div className="postPatch_content">
          <p>Le contenu : </p>
          <input
            type="text"
            name="content"
            id="content"
            value={post.content}
            onChange={handleChange}
          ></input>
        </div>

        <div className="postPatch_like">
          <p>Like {post.like}</p>
        </div>

        <div className="postPatch_picture">
          <p>Photos url: </p>
          <input
            type="text"
            name="picture"
            id="picture"
            value={post.picture}
            onChange={handleChange}
          ></input>
        </div>

        <div>{post.errorMessage}</div>
        <button
          type="submit"
          className="postPatch_button"
          onClick={handleSubmit}
        >
          Modifier
        </button>
      </form>
    </div>
  );
}