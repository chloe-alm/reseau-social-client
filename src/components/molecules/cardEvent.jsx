import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
require("../molecules/_cardEvent.scss");

export default function CardEvent({ event }) {
  console.log("eventcard",event);
  return (
    <div>
      
      <div className="postCardEvent" key={event.id}>
        <Link className="postCardEvent_link" to={`/events/${event.id}`}>
          <h1 className="postCardEvent_link_title">{event.title}</h1>
          <p className="postCardEvent_link_content">
            {event.content}
            <br />
            <br />
            #{event.hashtag}
            
            {/* {event.chevaux} */}
          </p>
        </Link>
      </div>
    </div>
  );
}
