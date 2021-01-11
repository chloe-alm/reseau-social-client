import { createEvent } from "@testing-library/react";
import React from "react";
import CardEventAdmin from "../../molecules/cardEventAdmin";
import NavBar from "../../molecules/NavBar";
import EventCreate from "../../organisms/EventCreate/EventCreate";
import ListEvent from "../../organisms/ListEvent/listEvent";
import listEvent from "../../organisms/ListEvent/listEvent";
import ListEventAdmin from "../../organisms/ListEvent/listEventAdmin";
require("../AdminHome/_AdminHome.scss")

export default function AdminHome(props) {
  return (
    <div>
      <NavBar />
      <EventCreate/>

      <ListEventAdmin />
    </div>
  );
}
