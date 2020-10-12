import React from "react";
import { Link } from "react-router-dom";

export default function PostCard({ post }) {
  return (
    <div className="postCard" key={post.id}>
      <Link className="postCard-link" to={"./"}>
        <div className="postCard-link-image">
          <img
            className="postCard-link-image-place"
            src={`${post.picture}`}
            alt="aperçu du lieu"
          />
        </div>
        <div className="postCard-link-infos">
          <p className="postCard-link-infos-content">Content: {post.content}</p>
          <p className="postCard-link-infos-like">• {post.like} like</p>
        </div>
      </Link>
    </div>
  );
}
