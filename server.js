require("dotenv").config();

const path = require("path");
const express = require("express");
const methodOverride = require("method-override");

const app = express();
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
const db = mongoose.connection;
const dbconnection = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/grabpay";
mongoose.connect(dbconnection, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

db.on("error", (err) => console.log(err.message + " . mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", dbconnection));
db.on("disconnected", () => console.log("mongo disconnected"));

const TransactionController = require("./controller/TransactionController");
app.use("/api/transaction", TransactionController);


const UserController = require("./controller/UserController");
app.use("/api/user", UserController);

const jwtController = require("./controller/JwtController");
app.use("/api/session", jwtController);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./react-folder/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'react-folder', 'build', 'index.html'));
    });
}

const port = process.env.BE_PORT || 4001;
app.listen(port, () => {
    console.log("Server is listening on port " + port);
});
