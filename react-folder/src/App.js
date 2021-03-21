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
import Transaction from "./pages/Transaction"
import SignUp from "./pages/SignUp"
import History from "./pages/History"
import HistoryDetails from "./pages/HistoryDetails"
import Logout from "./pages/Logout"

import axios from "axios"

const jwt = require("jsonwebtoken");

function App() {
  const [user, setUser] = useState({});
  const [refresh, setRefresh] = useState(false)

  console.log("user at App", user);

  const secret = process.env.REACT_APP_JWT_SECRET_KEY
  const token = sessionStorage.getItem("token");


  useEffect(() => {// GRAB ID FROM TOKEN = axios to get updated info
    if (token !== null) { // logged in
      const decoded = jwt.verify(token, secret);
      // TO DO: if token has expire, clear the token
      axios
        .get(`/api/user/${decoded.user._id}`)
        .then((response) => {
          // console.log(response)
          const user = response.data
          setUser({ userId: user._id, username: user.username, mobile: user.mobile, balance: user.balance, transactions: user.transactions, updatedAt: user.updatedAt })
        })
        .catch((error) => {
          console.log("error axios userID", error)
        })
    }
  }, [token, refresh])

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
            <Route exact path="/transfer">
              {/* <Transaction1 /> */}
              {user.userId === undefined ? <Redirect to={"/"} /> : <Transaction user={user} setRefresh={setRefresh} />}
            </Route>

            <Route exact path="/signup">
              {/* <SignUp setUser={setUser} /> */}
              {user.userId === undefined ? <SignUp setUser={setUser} /> : <Redirect to={"/landing"} />}
            </Route>

            <Route exact path="/history">
              {/* <History /> */}
              {user.userId === undefined ? <Redirect to={"/"} /> : <History user={user} />}
            </Route>

            <Route exact path="/history/:id">
              {/* <HistoryDetails /> */}
              {user.userId === undefined ? <Redirect to={"/"} /> : <HistoryDetails user={user} />}
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
