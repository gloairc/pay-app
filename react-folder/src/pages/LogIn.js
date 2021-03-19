import { useState } from "react";
import LoginSignup from "../components/LoginSignup"
import axios from "axios";
import { Alert } from "react-bootstrap";
import { Redirect } from 'react-router-dom';

const jwt = require("jsonwebtoken");

const LogIn = (props) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const secret = process.env.REACT_APP_JWT_SECRET_KEY;
    console.log("secret", secret)

    const handleLogin = (event) => {
        event.preventDefault();
        setErrorMsg("");
        axios
            .post("/api/session", formData, { withCredentials: true }) //get token
            .then((response) => {
                console.log("response.data", response.data);
                if (response.data.token) {
                    //set token to sessionStorage
                    const token = response.data.token;
                    sessionStorage.setItem("token", token);
                    const decoded = jwt.verify(token, secret); //cant read secret :/
                    const user = {
                        userId: decoded.user._id,
                        username: decoded.user.username,
                    }; //useState or if statement?
                    props.setUser(user);
                    console.log("logging in");
                    setIsLoggedIn(true)
                }
            })
            .catch((error) => { //error 
                //handling error not working
                // setErrorMsg(error.error);
                console.log(error)
                if (error.response === undefined) { //JSON token error
                    setErrorMsg(error.message)
                }
                else if (error.response.data.error === undefined) {
                    setErrorMsg(error.response.statusText);
                } else {
                    setErrorMsg(
                        error.response.statusText + ", " + error.response.data.error
                    );
                } // custom message from backend
                console.log(
                    "error from posting session error",
                    error
                );
            });
    };

    const setMessage = () => {
        if (errorMsg) {
            console.log(errorMsg);
            return (
                <Alert variant="danger">
                    {" "}
                    <span class="font-weight-bold">Oh no! </span>
                    {errorMsg}
                </Alert>
            );
        } else {
            return <span />;
        }
    };

    if (isLoggedIn === true) {
        return <Redirect to={"/landing"} />;
    }

    return (
        <div id="login-cont" class="container-fluid">
            <LoginSignup handleSubmit={handleLogin} setFormData={setFormData} formData={formData} message={setMessage} header="Log In" button="Let's Go" oppHeader="Sign Up" oppHeaderLink="/signup" />
        </div>
    )
}

export default LogIn