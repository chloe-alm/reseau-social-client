import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CardEvent from "../../molecules/cardEvent";
import CardEventAdmin from "../../molecules/cardEventAdmin";
import NavBar from "../../molecules/NavBar";
import Footer from "../Footer/Footer";

// require("../ListEvent/");

export default function ListEventAdmin() {
  const token = localStorage.getItem("token");
  const [listEvent, setListEvent] = useState([]);
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
          url: "http://localhost:8001/api/events",
        });
        console.log(result.data);

        if (result.data) {
          setListEvent(result.data.event);
        }
      } catch (error) {
        console.log(error.response);
        // setErrorForm(error.response.data.description);
      }
    };
    fetchData();
  }, [token]);
  return (
    <div>
     
      <div className="listEvent">
        {listEvent.map((event,id) => {
          return (
           <div>
              <CardEventAdmin event={event} key={id} />
            </div>
           
          );
        })}
      </div>
      <div className="containerList_erreur">{errorForm}</div>
     
    </div>
  );
}