import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.scss";
import Home from "./components/pages/Home/home";
import Login from "./components/pages/Login/login";
import { Profil }from "./components/pages/Profil/profil";
import Register from "./components/pages/Register/register";
import { AuthContext } from "./context/auth";
import reducer from "./context/reducer";
import OnePost from "./components/pages/OnePost/onePost";
import ListPost from "./components/pages/ListPosts/listPosts";

function App() {
  const initialState = {
    isAuthenticated: false,
    user: null,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await axios.get("http://localhost:8001/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (user.status === 200) {
          dispatch({
            type: "LOAD_USER",
            payload: user,
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
          {/* <Route exact path="/Onepost">
            <OnePost/>
          </Route> */}
          <Route exact path="/posts">
            <ListPost/>
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
