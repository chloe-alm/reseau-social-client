import React, { useEffect, useState } from "react";
import Axios from "axios";
// import { Link, Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";

export default function Onepost() {
  const token = localStorage.getItem("token");
  let { id } = useParams();

  const [post, setPost] = useState({});
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
          url: `http://localhost:8001/api/posts/${id}`,
        });
        if (result.data) {
          setPost(result.data.post);
        }
      } catch (error) {
        setErrorForm(error);
      }
    };
    fetchData();
  }, [id, token]);
  return (
    <div className="containerOnePost">
      <div>{errorForm}</div>
      <p>{post.content}</p>
    </div>
  );
}
