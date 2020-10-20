import React from "react";
import { Link } from "react-router-dom";
import likelogo from "../../assets/images/like.png";
import PostPatch from "../organisms/PostCrud/postPatch";
import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
require ("./_postcard.scss");

export default function PostCard({ post }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    post.like = `${count}`
      
      setCount()
    })
    
  

    
  return (
    <div className="postCard" key={post.id}>
      <div className="postCard_image">
        <img
          
          src={post.picture}
          alt="aperçu de l'image"
        />
      </div>
      <div className="postCard_contenu">
        <p className="postCard_contenu_content">Le contenu: {post.content}</p>
         <button className="postCard_contenu_like" onClick={()=>setCount(count+1)}>
          <img 
          src={likelogo} 
          alt="image du like"/>• {post.like}</button>
      </div>
    </div>
  );
  }

