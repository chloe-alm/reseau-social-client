import React, { useEffect, useState } from "react";
import Axios from "axios";
// import { Link, Redirect } from "react-router-dom";
import { useParams } from "react-router-dom";
import { PostDelete } from "../../organisms/PostCrud/postDelete";
require("./_onePost.scss");

export default function Onepost() {
  const token = localStorage.getItem("token");
  let { id } = useParams();

  let [onePost, setOnePost] = useState({});
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
          setOnePost(result.data.post);
        }
      } catch (error) {
        console.log("error",error)
        setErrorForm(error);
      }
    };
    fetchData();
  }, [token, id]);

  return (
    <>
    
      <div className="post">
       
        <PostDelete post={onePost} />
      </div>
    </>
  );
}
