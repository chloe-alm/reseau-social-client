import Axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { link, useHistory } from "react-router-dom";


export default function PostCreate() {
  const history = useHistory();
    const token = localStorage.getItem("token");

    const [createPost, setCreatePost] = useState({
        content: "",
        like: "",
        picture:"",
        isSubmitting:false,
        errorMessage:null,
    });
   
    const handleChange =(event)=>{
        setCreatePost({ ...createPost,[event.target.name]:event.target.value});
    };
    const handleSubmit = async (e) =>{
        try {
            e.preventDefault();
            setCreatePost({
                ...createPost,
                isSubmitting:true,
            });
            const result = await Axios({
                method:"post",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`, 
                },
                url:"http://localhost:8001/api/posts",
                data: JSON.stringify(createPost),
            });
            history.push("./posts");
            if (result.status === 200){
                // setCreatePost(result.data.post);
                console.log("creation",createPost);
            }
        }catch(error){
            setCreatePost({
                ...createPost,
                isSubmitting: false,
                // errorMessage: error.res.data.description,
            });
        }
    };

    return (
       
     <div>
       <form
        className="postCreate"
        method="POST"
        action="/posts"
        onSubmit={handleSubmit}>

     <div className="postCreate_content">
          <p>Le contenu : </p>
          <input
            type="text"
            name="content"
            id="content"
            value={createPost.content}
            onChange={handleChange}
          ></input>
        </div>
        <div className="postCreate_like">
          <p>Like {createPost.like}</p>
        </div>

        <div className="postCreate_picture">
          <p>Photos url: </p>
          <input
            type="text"
            name="picture"
            id="picture"
            value={createPost.picture}
            onChange={handleChange}
          ></input>
        </div>

        <div>{createPost.errorMessage}</div>

        <button
          type="submit"
          className="postCreate_button"
          onClick={handleSubmit}
        >
          Creer
        </button>
       </form>
      </div>
    );
}
