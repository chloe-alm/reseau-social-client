import Axios from "axios";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import PostCard from "../../molecules/postcard";
import PostGet from "./postGet";


export function PostDelete({post}) {
    const token = localStorage.getItem("token");
    const history = useHistory();

    const [deletePost, setDeletePost] = useState({
        content:post.content,
        like:post.like,
        picture:post.picture,
        isSubmitting:false,
        errorMessage:null,
    });
    const handleSubmit =  async (e) => {
        try{
            e.preventDefault();
            setDeletePost({
                ...deletePost,
                isSubmitting:true,
            });
            const result = await Axios({
                methode:"delete",
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,  
                },
                url: `http://localhost:8001/api/posts/${post.id}`,
                data: JSON.stringify(deletePost),

            });
               if (result.status === 200){
                console.log("delete",deletePost)

            }
        }catch(error){
                setDeletePost({
                    ...deletePost,
                    isSubmitting:false,
                    errorMessage:error.res.data.description,
                });
            }
        }
    

    return (
        <>
            <h2 className="postDelete">Voulez vous supprimer votre post? </h2>
            <form 
                deletePost={deletePost}
                key={post.deletePost}
                method="DELETE"
                action="/posts"
                onSubmit={handleSubmit}
                >
                    <div><PostGet/></div>
                    <button 
                    type="submit" 
                    className="postDelete_bouton"
                    onClick={handleSubmit}
                    >
                        supprimer
                    </button>

            </form>
        </>
    )
}
