const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../model/user");
const { body, validationResult } = require("express-validator");
const methodOverride = require("method-override");
router.use(methodOverride("_method"));
const { StatusCodes } = require("http-status-codes");

const dummyData = require("../model/dummyData");

// SEEDING
router.get("/seed", (req, res) => {
    console.log("seeding");
    User.create(dummyData.userSeed, (error, user) => {
        if (error) {
            console.log(error);
            return res.send({ ...error, message: "likely user already exist" });
        }
        console.log("users", user);
        res.redirect("/api/user");
    });
});

// INDEX, check for existing username
router.get("/", (req, res) => {
    if (req.query.username) { //if query has username, check if it exist
        console.log("req.query.username", req.query.username);
        User.find({ username: req.query.username }, (error, oneUser) => {
            if (error) {
                res.status(StatusCodes.BAD_REQUEST).send(error);
            } else { //user exist
                // console.log(oneUser) //[{username:...,}]
                const userObj = oneUser[0]
                // console.log(userObj)
                const userNoPw = { ...userObj, password: "" }; //do not return password
                res.status(StatusCodes.OK).send(userNoPw);
                // console.log(userNoPw)
            }
        }).lean()
    }
});

// Get record of that one user
router.get("/:id", (req, res) => {
    User.findById(req.params.id, (error, oneUser) => {
        if (error) {
            res.send(error);
        } else {
            //user exist
            const userNoPw = { ...oneUser, password: "" }; //do not return password
            res.status(StatusCodes.OK).send(userNoPw);
        }
    }).lean();
});

// Create new user
router.post(
    "/",
    body("username", "Username has to be at least 6 characters long.")
        .trim()
        .isLength({ min: 6 }),
    body("password", "Password has to be 6 digit long.")
        .trim().isLength(6).bail().isNumeric().bail(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Errors returned in an array `errors.array()`.
            const locals = { UserInput: req.body, errors: errors.array() };
            res.status(StatusCodes.BAD_REQUEST).send(locals);
        } else {
            //!! check if username already exist, if so, return error message?
            //Data is valid
            console.log(req.body);
            //overwrite the user password with the hashed password, then pass that in to our database
            req.body.password = bcrypt.hashSync(
                req.body.password,
                bcrypt.genSaltSync()
            );

            //create new user
            User.create(req.body, (error, user) => {
                if (error) {
                    res.send(error);
                } else {
                    res.send(user);
                    console.log("created user");
                    return user;
                }
            });
        }
    }
);

// Update user
// User.findByIdAndUpdate(
//     req.params.id, // id
//     req.body, // what to update
//     { new: true },
//     (error, updatedUser) => {
//         if (error) {
//             res.status(StatusCodes.BAD_REQUEST).send(error);
//         } else {
//             res.status(StatusCodes.OK).send(updatedUser);
//         }
//     }
// );

// Soft-Delete user
// router.put("/:id/sdelete", (req, res) => {
//     //softdelete
//     User.findById(req.params.id, (err, user) => {
//         if (err) {
//             res.send(err);
//             console.log("error occurred " + err);
//         } else {
//             user.status = "Inactive";
//             user.save((er) => {
//                 if (er) {
//                     res.send(er);
//                 } else {
//                     res.send(user);
//                 }
//             });
//             console.log("soft delete");
//         }
//     });
// });

module.exports = router;
