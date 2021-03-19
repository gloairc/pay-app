const bcrypt = require("bcrypt");
const express = require("express");
const jwtSession = express.Router();
const createJWTToken = require("./createJWTconfig");
const User = require("../model/userM.js");
const { StatusCodes } = require("http-status-codes");

//login
jwtSession.post("/", async (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            console.log(err);
            res
                .status(500)
                .send({ error: "Oops there's a problem with the server database" });
        } else if (!foundUser) {
            res.status(401).send({ error: `sorry, no user found, unable to start session.` });
        } else {
            //no error with server database and found user in database
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                //password match, create token
                const token = createJWTToken(foundUser);
                const tenMinute = 10 * (60 * (60 * 1000));
                const expiryDate = new Date(Date.now() + tenMinute);
                res.cookie("token", token, {
                    expires: expiryDate,
                    httpOnly: true, // client-side js cannot access cookie info
                    secure: true, // use HTTPS
                });
                // res.status(200).send("You are now logged in!");
                res.status(200).json({ token });
            } else {
                res.status(401).send({ error: `incorrect password, unable to start session` });
            }
        }
    });
});

//logout
jwtSession.post("/logout", (req, res) => {
    res.clearCookie("token").send("You are now logged out!");
    res.status(StatusCodes.OK).send({ msg: "Logging out" });
});

module.exports = jwtSession;
