import { useState } from "react";
import axios from "axios";
import {
    Form,
    Button,
    Row,
    Col,
    Alert,
} from "react-bootstrap";

const jwt = require("jsonwebtoken");

const LogIn = (props) => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [errorMsg, setErrorMsg] = useState("");
    const [loginStatus, setLoginStatus] = useState(false); //to redirect to /beatseq
    const [status, setStatus] = useState(""); //inform user that logging in

    const secret = process.env.JWT_SECRET_KEY;

    const handleLogin = (event) => {
        event.preventDefault();
        setErrorMsg("");
        axios
            .post("/api/session", formData, { withCredentials: true }) //get token
            .then((response) => {
                console.log("response.data", response.data);
                if (response.data.token) {
                    //set token to localStorage
                    const token = response.data.token;
                    localStorage.setItem("token", token);
                    const decoded = jwt.verify(token, secret); //cant read secret :/
                    const user = {
                        userId: decoded.user._id,
                        username: decoded.user.username,
                    }; //useState or if statement?
                    setStatus("logging in"); //re-render
                    props.setUser(user);
                    console.log("logging in");
                    setTimeout(() => {
                        setLoginStatus(true);
                    }, 800);
                }
            })
            .catch((error) => {
                //handling error not working
                setStatus("");
                // setErrorMsg(error.error);
                if (error.response.data.error === undefined) {
                    setErrorMsg(error.response.statusText);
                } else {
                    setErrorMsg(
                        error.response.statusText + ", " + error.response.data.error
                    );
                } // custom message from backend
                console.log(
                    "error from posting session error.response",
                    error.response
                );
            });
    };

    const message = () => {
        if (errorMsg) {
            console.log(errorMsg);
            return (
                <Alert variant="danger">
                    {" "}
                    <span class="font-weight-bold">Oh no! </span>
                    {errorMsg}
                </Alert>
            );
        } else if (status === "logging in") {
            return (
                <Alert variant="success">
                    <span class="font-weight-bold">Success : </span>Get ready to dope!
                </Alert>
            );
        } else {
            return <span />;
        }
    };

    return (
        <div id="login-cont" class="container-fluid">
            <div class="form-h1">
                <h1>Log In</h1>
            </div>

            <div id="login-form-cont" class="container-fluid">
                <Form onSubmit={handleLogin}>
                    <Form.Group controlId="username">
                        <Form.Label>
                            <span class="fw-bold">Username</span>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder="username"
                                value={formData.username}
                                onChange={(event) => {
                                    // console.log(event.target)
                                    setFormData((state) => {
                                        return { ...state, username: event.target.value };
                                    });
                                }}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>
                            <span class="fw-bold">Password</span>
                        </Form.Label>
                        <Col>
                            <Form.Control
                                type="Password"
                                placeholder="password"
                                value={formData.password}
                                onChange={(event) => {
                                    setFormData((state) => {
                                        return { ...state, password: event.target.value };
                                    });
                                }}
                            />
                        </Col>
                    </Form.Group>

                    <br />
                    <Row>
                        <Button variant="primary" type="submit" block>
                            Log In
                </Button>
                    </Row>

                    <br />
                    <Row>
                        {message()}
                    </Row>
                </Form>
            </div>

            <div id="login-signup" class="container-fluid">
                <Row>
                    Don't have an account?
                <Button variant="secondary" block>
                        Sign Up
                </Button>
                </Row>
            </div>
        </div>
    )
}

export default LogIn