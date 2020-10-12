import React,{useState}from "react";
import Axios from "axios";
import {Link, Redirect }from "react-router-dom";
import { useEffect } from "react";

require("./_listPosts.scss");


export default function Listposts(props) {
  const [lists, setList] = useState([]);
    const handlePost = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        await Axios({
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
            url: 'http://localhost:8001/api/user/me'
        })
            .then(res=> {
                localStorage.setItem('usertoken', res.data)
                console.log('tutu', res.data)
                return res.data

            });
    };
    useEffect(()=>{
        const fetchData = async()=>{
            try{
                const result = await Axios.get('http://localhost:8001/api/posts')
                setList(result.data) 
            }
            catch (error){
                console.error(error);
            }
          
        };
        fetchData();

        
    }, []);
    
        
    return (
        <>
        <div onLoad={handlePost} className= "ContainerList">
            {lists.map((list, i)=>(
                <div key={i} className="ContainerList_lists">
                    <p>{list.content}</p></div>
            ))}

        </div>
        </>
      

    )
}

