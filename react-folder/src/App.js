import "./App.css";
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavyBar from "./pages/Navbar"
import LogIn from "./pages/LogIn"
import Landing from "./pages/Landing"
import Transaction1 from "./pages/Transaction1"
import Transaction2 from "./pages/Transaction2"
import SignUp from "./pages/SignUp"
import History from "./pages/History"
import HistoryDetails from "./pages/HistoryDetails"
import Logout from "./pages/Logout"

import axios from "axios"

const jwt = require("jsonwebtoken");

function App() {
  const [user, setUser] = useState({});
  console.log("user at App", user);

  const secret = process.env.REACT_APP_JWT_SECRET_KEY
  const token = sessionStorage.getItem("token");


  useEffect(() => {// initial setup for user
    if (token !== null) { // logged in
      const decoded = jwt.verify(token, secret); //cant read secret :/
      // if token has expire, clear the token
      setUser({ userId: decoded.user._id, username: decoded.user.username, mobile: decoded.user.mobile, balance: decoded.user.balance, transactions: decoded.user.transactions, updatedAt: decoded.user.updatedAt })
    }
  }, [token])

  useEffect(() => { //update User
    axios
      .get(`/api/user/${user.userId}`)
      .then((response) => {
        console.log(response)
      }
      )
  }, [])


  return (
    <div class="container-fluid px-0" id="overall-app-cont">
      <Router>
        <NavyBar user={user} />

        <div id="body-cont" class="container-fluid">
          <Switch>
            {/* Log in */}
            <Route exact path="/">
              {user.userId === undefined ? <LogIn setUser={setUser} /> : <Redirect to={"/landing"} />}
            </Route>

            <Route exact path="/restricted">
              <h1>You are not authorised to visit this page.</h1>
            </Route>

            {/* landing page - balance, button to make transfer or see history */}
            <Route exact path="/landing">
              {/* <Landing setUser={setUser} /> */}
              {user.userId === undefined ? <Redirect to={"/"} /> : <Landing user={user} />}
            </Route>

            {/* Transfer $ to someone */}
            <Route exact path="/transfer/1">
              <Transaction1 />
              {/* {user.userId === undefined ? <Redirect to={"/"} /> : <Transaction1 />} */}
            </Route>

            <Route exact path="/transfer/2">
              <Transaction2 />
              {/* {user.userId === undefined ? <Redirect to={"/"} /> : <Transaction2 />} */}
            </Route>

            <Route exact path="/signup">
              {/* <SignUp setUser={setUser} /> */}
              {user.userId === undefined ? <SignUp setUser={setUser} /> : <Redirect to={"/landing"} />}
            </Route>

            <Route exact path="/history">
              <History />
              {/* {user.userId === undefined ? <Redirect to={"/"} /> : <History />} */}
            </Route>

            <Route exact path="/history/:id">
              <HistoryDetails />
              {/* {user.userId === undefined ? <Redirect to={"/"} /> : <History />} */}
            </Route>


            <Route exact path="/logout">
              <Logout />
              {user.userId === undefined ? <Redirect to={"/"} /> : <Logout user={user} setUser={setUser} />}
            </Route>
          </Switch>
        </div>

      </Router>

    </div>
  );
}

export default App;
