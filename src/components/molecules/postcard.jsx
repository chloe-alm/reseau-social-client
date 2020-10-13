import React from "react";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="postCard" key={post.id}>
      <div className="postCard-link-image">
        <img
          className="postCard-link-image-place"
          src={`${post.picture}`}
          alt="aperçu du lieu"
        />
      </div>
      <div className="postCard-link-infos">
        <p className="postCard-link-infos-content">Content: {post.content}</p>
        <p className="postCard-link-infos-like">• {post.like}likes</p>
      </div>
    </div>
  );
}
