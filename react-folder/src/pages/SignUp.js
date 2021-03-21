import { useState } from "react";
import LoginSignup from "../components/LoginSignup"
import axios from "axios";
import { Alert } from "react-bootstrap";

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
                // console.log("user created, response", response, "time to axios post session");
                //axios a session and get token
                axios
                    .post("/api/session", formData, { withCredentials: true })
                    .then((response) => {
                        // console.log("response.data from post api session", response.data);
                        if (response.data.token) {//get token
                            //set token to sessionStorage
                            const token = response.data.token;
                            sessionStorage.setItem("token", token);
                            console.log("logging in");
                            props.setUser(token);
                        }
                    })
                    .catch((error) => {
                        //handling session error not working??
                        console.log(error)
                        if (error.response === undefined) { //JSON token error etc
                            setErrorMsg(error.message)
                        } else if (error.response.data.error === undefined) {
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

    const handleBlurName = (event) => {
        axios.get("/api/user", {  // /user?username=formData.username
            params: { username: formData.username }
        })
            .then((response) => {// either receive the existing one user else or all users when username ===""
                // console.log("handle blur response.data", response.data)
                if (([response.data]).length === 1) { //returns only one
                    if ([response.data][0].username !== undefined) {
                        if (formData.username === [response.data][0].username) {
                            setErrorMsg([{ msg: "Sorry, username already taken." }])
                        }
                    } else {
                        setErrorMsg("")
                    }
                } else {
                    return
                }
            })
    }

    const handleBlurMobile = (event) => {
        axios.get("/api/user", {  // /user?username=formData.username
            params: { mobile: formData.mobile }
        })
            .then((response) => {// either receive the existing one user else or all users when username ===""
                // console.log("handle blur response.data", response.data)
                if (([response.data]).length === 1) { //returns only one
                    if ([response.data][0].mobile !== undefined) {
                        if ((formData.mobile - [response.data][0].mobile) === 0) {
                            setErrorMsg([{ msg: "Sorry, this number already has an existing account." }])
                        }
                    } else {
                        setErrorMsg("")
                    }
                } else {
                    return
                }
            })
    }

    return (
        <div id="login-cont" class="container-fluid">
            <LoginSignup handleSubmit={handleLogin} setFormData={setFormData} formData={formData} message={setMessage} header="Create an Account" button="Sign Up" oppHeader="Log In" oppHeaderLink="/" usernameText="at least 6 alphanumeric character" passwordText="6-digit pin" mobileText="8-digit mobile number" handleBlurName={handleBlurName} handleBlurMobile={handleBlurMobile} />
        </div>
    )
}

export default SignUp