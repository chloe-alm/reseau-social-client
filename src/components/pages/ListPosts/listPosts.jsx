import React, { useState } from "react";
import Axios from "axios";
import { useEffect } from "react";
import PostCard from "../../molecules/postcard";
import NavBar from "../../molecules/NavBar";
import PostCreate from "../../organisms/PostCrud/postCreate";
import PostDelete from "../../organisms/PostCrud/postDelete";
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
        setErrorForm(error.response.data.description);
      }
    };
    fetchData();
  }, [token]);
  const [count, setCount] = useState(0);
  return (
    <div className="containerList">
      <div className="containerList_erreur">{errorForm}</div>
      <div className="containerList_titre">Les Posts</div>
      <NavBar />
      <div className="containerList_creation">
        {" "}
        <p>Création d'un post</p>
        <PostCreate />
      </div>

      <div className="containerList_card">
        {list.map((post) => {
          return (
            <div>
            
              <PostCard post={post} key={post.id} />
            {/* </Link> */}
               
              </div>
          );
        })}
      </div>
    </div>
  );
}
