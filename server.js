require("dotenv").config();

const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const app = express();

// var MONGODB_URI =  "mongodb+srv://<username>:<password>!xxxxx";

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());

const session = require("express-session");
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

const mongoose = require("mongoose");
mongoose.connect(MONGODB_URI || process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

const TransactionController = require("./controllers/TransactionController");
app.use("/api/beatsequence", TransactionController);


const UserController = require("./controllers/UserController");
app.use("/api/user", UserController);

const jwtController = require("./controllers/JwtController");
app.use("/api/session", jwtController);


const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
