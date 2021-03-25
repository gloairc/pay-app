import { Redirect } from "react-router-dom";
import axios from "axios";
// const jwt = require("jsonwebtoken");

const Logout = (props) => {// user={userId, username}

    console.log("props.user", props.user)
    const loggedIn = props.user === undefined ? false : true

    axios.post('api/session/logout')
        .then((response) => {
            sessionStorage.clear(); //both token and dateRange
            // console.log(response)
        }).then(() => {
            props.setUser({})
        })
        .catch((error) => {
            console.log(error)
        })

    return (
        <>
            {loggedIn ? <Redirect to={'/'} /> : <h1>Logging out...</h1>}
        </>
    );
};

export default Logout;
