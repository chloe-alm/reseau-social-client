import React, { useState } from "react";
import Axios from "axios";
// import { Link, Redirect } from "react-router-dom";
import { useEffect } from "react";
import PostCard from "../../molecules/postCard";

require("./_listPosts.scss");

export default function Listposts(props) {
  const [list, setList] = useState([]);
  const [errorForm, setErrorForm] = useState(" ");

  // const handlePost = async (event) => {
  //     event.preventDefault();
  //     const token = localStorage.getItem('token');
  //     await Axios({
  //         method: 'get',
  //         headers: {
  //             'Content-Type': 'application/json',
  //             authorization: `Bearer ${token}`,
  //         },
  //         url: 'http://localhost:8001/api/user/me'
  //     })
  //         .then(res=> {
  //             localStorage.setItem('usertoken', res.data)
  //             console.log('tutu', res.data)
  //             return res.data

  //         });
  // };
    useEffect(() => {
  const fetchData = async () => {
    try {
      const result = await Axios.get("http://localhost:8001/api/posts");
      console.log("result.data", result);
      if (result.data) {
        setList(result.data.post);
      }
    } catch (error) {
      setErrorForm(error);
    }
  };
  console.log("la liste", list);
  fetchData();
    }, []);

  return (
    <>
      <div className="containerList">
        <div>{errorForm}</div>
        {list.map((post) => {
          return <PostCard post={post} key={post.id} />;
        })}
      </div>
    </>
  );
}
