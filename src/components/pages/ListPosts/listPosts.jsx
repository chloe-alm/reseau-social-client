import React, { useState } from "react";
import Axios from "axios";
// import { Link, Redirect } from "react-router-dom";
import { useEffect } from "react";
import PostCard from "../../molecules/postcard";
import imagecentre from "../../../assets/images/centre.png";
import { Link } from "react-router-dom";
import NavBar  from"../../molecules/NavBar";

require("./_listPosts.scss");

export default function Listposts(props) {
  const token = localStorage.getItem("token");

  const [list, setList] = useState([]);
  const [errorForm, setErrorForm] = useState(" ");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Axios({
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          url: "http://localhost:8001/api/posts",
        });
        if (result.data) {
          setList(result.data.post);
        }
      } catch (error) {
        setErrorForm(error);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div className="containerList">
      <div className="containerList_error">{errorForm}</div>
      <div className="containerList_header">Les Posts</div>
      <NavBar/>
      <div className="containerList_card">
        {list.map((post) => {
          return (
            <Link className="containerList_link" to={`/posts/${post.id}`}>
              <PostCard post={post} key={post.id} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
