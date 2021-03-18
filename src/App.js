import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import NavBar from "./pages/Navbar"
import LogIn from "./pages/LogIn"
import Landing from "./pages/Landing"
import Transaction1 from "./pages/Transaction1"
import Transaction2 from "./pages/Transaction2"
import SignUp from "./pages/SignUp"
import History from "./pages/History"
import HistoryDetails from "./pages/HistoryDetails"
import Logout from "./pages/Logout"

function App() {
  return (
    <div class="container-fluid px-0" id="overall-app-cont">
      <Router>
        <NavBar />
        {/* <NavBar user={user} /> */}

        <Switch>
          {/* Log in */}
          <Route exact path="/">
            <LogIn />
          </Route>

          <Route exact path="/restricted">
            <h1>You are not authorised to visit this page.</h1>
          </Route>

          {/* landing page - balance, button to make transfer or see history */}
          <Route exact path="/landing">
            <Landing />
            {/* {user.userId === undefined ? <Redirect to={"/"} /> : <Landing />} */}
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
            <SignUp />
            {/* {user.userId === undefined ? <SignUp setUser={setUser} /> : <Redirect to={"/landing"} />} */}
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
            {/* {user.userId === undefined ? <Redirect to={"/"} /> : <Logout user={user} setUser={setUser} />} */}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
