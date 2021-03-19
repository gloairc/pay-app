import { useState } from "react";
import LoginSignup from "../components/LoginSignup"
import axios from "axios";
import { Alert } from "react-bootstrap";

const jwt = require("jsonwebtoken");

const SignUp = (props) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [loginStatus, setLoginStatus] = useState(false); //to redirect to /
    const [status, setStatus] = useState(""); //inform user that logging in

    const secret = process.env.JWT_SECRET_KEY;

    const handleLogin = (event) => {
        event.preventDefault();
        setErrorMsg("");
        axios
            .post("/api/user", formData) //create user
            .then((response) => {
                console.log("user created, response", response, "time to axios post session");
                //axios a session and get token
                axios
                    .post("/api/session", formData, { withCredentials: true })
                    .then((response) => {
                        console.log("response.data from post api session", response.data);
                        if (response.data.token) {//get token
                            //set token to localStorage
                            const token = response.data.token;
                            localStorage.setItem("token", token);
                            const decoded = jwt.verify(token, secret); //cant read secret :/
                            const user = {
                                userId: decoded.user._id,
                                username: decoded.user.username,
                            };
                            console.log("logging in");
                            props.setUser(user);

                            // setLoginMsg(true)
                            // // setSent(true); //created user & posted session
                            // setTimeout(() => {
                            //     setSent(true)
                            // }, 1000);
                        }
                    })
                    .catch((error) => {
                        //handling session error not working??
                        console.log(error.response)
                        if (error.response.data.error === undefined) {
                            setErrorMsg(error.response.statusText)
                        } else {
                            setErrorMsg([{ msg: (error.response.statusText) + ", " + (error.response.data.error) }]);
                        }
                    });
            })
            .catch((error) => {// catch post error, validation of signup form
                //handling error not working?
                console.log("error from posting user SIGNUP", error.response.data.errors);
                // console.log("error from posting user", error.response.data.error);
                // console.log("error from posting user error.response", error.response);
                if (error.response.data.errors === undefined) { //no message
                    setErrorMsg([{ msg: error.response.statusText }])
                } else {
                    setErrorMsg(error.response.data.errors); //array of object
                }
            });
    };


    const showErrorMsg = () => {
        let showErrorArray = []
        showErrorArray.push(<p>Error!</p>);
        for (let i = 0; i < errorMsg.length; i++) {
            showErrorArray.push(<p key={i}>{errorMsg[i].msg}</p>);
        }
        return showErrorArray
    }

    const setMessage = () => {
        if (errorMsg) {
            return (
                <Alert variant="danger">
                    {" "}
                    <span class="fw-bold">Oh no! </span>
                    {showErrorMsg()}
                </Alert>
            );
        } else if (status === "logging in") {
            return (
                <Alert variant="success">
                    <span class="fw-bold">Success : </span> opening up your e-wallet
                </Alert>
            );
        } else {
            return <span />;
        }
    };

    return (
        <div id="login-cont" class="container-fluid">
            <LoginSignup handleSubmit={handleLogin} setFormData={setFormData} formData={formData} message={setMessage} header="Create an Account" button="Sign Up" oppHeader="Log In" oppHeaderLink="/" usernameText="at least 6 alphanumeric character" passwordText="6-digit pin" />
        </div>
    )
}

export default SignUp