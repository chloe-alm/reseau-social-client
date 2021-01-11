// import React from "react";
// import { Link } from "react-router-dom";
// import NavBar from "./NavBar";
// require("../molecules/_cardEventAdmin.scss");

// export default function CardEventAdmin({ event }) {
//   console.log("1",event);
//   return (
//     <div>
      
//       <div className="postCardEvent" key={event.id}>

        
//           <h1 className="postCardEvent_link_title">{event.title}</h1>
//           <p className="postCardEvent_link_content">
//             {event.content}
//             <br />
//             <br />
//             #{event.hashtag}
      
      
//           </p>
//           <Link className="postCardEvent_link" to={`/events/${event.id}`}>
//               <button>
//                   modifier
//               </button>
//         </Link>
//       </div>
//     </div>
//   );
// }
import Axios from "axios";
import React, { useContext, useState } from "react";
import { useAlert } from "react-alert";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import NavBar from "./NavBar";
require("../molecules/_cardEvent.scss");

export default function CardEvent({ event }) {
  const token = localStorage.getItem("token");
  const { state } = useContext(AuthContext);
  const history = useHistory();
  const alert = useAlert();
  const [deleteEvent, setDeleteEvent] = useState({
    title:event.title,
    content: event.content,
    hashtag: event.hashtag,
    isSubmitting: false,
    errorMessage: null,
  });
  console.log("state1",state)
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setDeleteEvent({
        ...deleteEvent,
        isSubmitting: true,
      });
      const result = await Axios({
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        url: `http://localhost:8001/api/events/${event.id}`,
        data: JSON.stringify(deleteEvent),
      });
      console.log(result);
      if (result.status === 201) {
        return alert.show("Event bien supprimé"),history.push("/");
      }
    } catch (error) {
      setDeleteEvent({
        ...deleteEvent,
        isSubmitting: false,
        errorMessage: error.response.data.description,
      });
    }
  };



  return (
    <div>
      
      <div className="postCardEvent" key={event.id}>
        <Link className="postCardEvent_link" to={`/events/${event.id}`}>
          <h1 className="postCardEvent_link_title">{event.title}</h1>
          <p className="postCardEvent_link_content">
            {event.content}
            <br></br>
            <br></br>
            
            #{event.hashtag}
            
            {/* {event.chevaux} */}
          </p>
        </Link>
      </div>
      {
            
            state.isAdmin === true ? (
              <div>
                <div className="container_OnePost_erreur">
            {deleteEvent.errorMessage}
          </div>
              <button
              type="submit"
              className="container_OnePost_boutonSupprimer"
              onClick={handleSubmit}
            >
              Supprimer
            </button>
            </div>
            ):(<div></div>)
            
            }
    </div>
  );
}
