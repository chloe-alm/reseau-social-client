import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Home from "./components/pages/Home/home";
import Login from "./components/pages/Login/login";
// import { Profil } from "./components/pages/Profil/profil";
import Register from "./components/pages/Register/register";
import OnePost from "./components/pages/OnePost/onePost";
import ListPost from "./components/pages/ListPosts/listPosts";

import { AuthContext } from "./context/auth";
import reducer from "./context/reducer";


function App() {
  const initialState = {
    isAuthenticated: false,
    token:null,
    user: null,
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
          console.log("dispatch app.js ==>", result.data);
          dispatch({
            type: "LOAD_USER",
            payload: result.data,
          });
        }
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <h1>Centre équestre de jablines</h1>
      <Router>
        {/* <Header /> */}
        <Switch>
          <Route exact path="/posts/:id">
            <OnePost/>
          </Route>
          <Route exact path="/posts">
            <ListPost />
          </Route>
          {/* <Route exact path="/profil">
            <Profil />
          </Route> */}
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
