import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Home from "./components/pages/Home/home";
import Login from "./components/pages/Login/login";
import { Profil } from "./components/pages/Profil/profil";
import Register from "./components/pages/Register/register";
import OnePost from "./components/pages/OnePost/onePost";
import ListPost from "./components/pages/ListPosts/listPosts";
import { AuthContext } from "./context/auth";
import reducer from "./context/reducer";
import Footer from "./components/organisms/Footer/Footer";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Contact } from "./components/pages/Contact/contact";
import { Notfound } from "./components/pages/NotFound/notFound";
import UserPatch from "./components/organisms/UserCrud/userPatch";
import EventPatch from "./components/organisms/EventPatch/EventPatch";

import AdminHome from "./components/pages/AdminHome/AdminHome";
function App() {
  const initialState = {
    isAuthenticated: false,
    token: null,
    user: null,
    isAdmin:null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const result = await axios.get("http://localhost:8001/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (result.status === 200) {
          dispatch({
            type: "LOAD_USER",
            payload: result.data,
          });
        }
      }
    };
    fetchUser();
  }, []);
  const option = {
    position: positions.TOP_CENTER,
    timeout: 3000,
    transition: transitions.SCALE,
  };
  console.log(state)
  console.log(AuthContext.state)
  return (
    <AlertProvider template={AlertTemplate} {...option}>
      <AuthContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        <h1>HorseField</h1>
        <Router>
          {/* <Header /> */}
          <Switch>
          

            <Route exact path="/posts/:id">
              <OnePost />
            </Route>
            <Route exact path="/posts">
              <ListPost />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route exact path="/profil">
            <Profil />
          </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/events/:id">
              <EventPatch />
            </Route>
            <Route exact path="/events">
              <AdminHome />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/register/:id">
              <UserPatch />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="*">
              <Notfound />
            </Route>
          </Switch>
        </Router>
        {/* <Footer/> */}
      </AuthContext.Provider>
    </AlertProvider>
  );
}

export default App;
