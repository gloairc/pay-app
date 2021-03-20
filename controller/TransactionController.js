const express = require("express");
const router = express.Router();
const Transaction = require("../model/transactionM");
const methodOverride = require("method-override");
router.use(methodOverride("_method"));
const { StatusCodes } = require("http-status-codes");

const dummyData = require("../model/dummyData");

router.get("/seed", (req, res) => {
    Transaction.create(dummyData.transactionSeed, (error, transaction) => {
        if (error) {
            res.send(error);
        } else {
            res.send(transaction);
        }
    });
});

//index, get all transaction of the person
router.get("/", (req, res) => {

    Transaction.find({}, (error, transaction) => {
        res.send(transaction);
    });
    console.log("get all transaction");
});

//transaction details
router.get("/:id", (req, res) => {
    Transaction.findById(req.params.id, (error, transaction) => {
        if (error) {
            res.status(StatusCodes.BAD_REQUEST).send(error)
        } else {
            res.status(StatusCodes.OK).send(transaction);
        }
    });
});

// new transaction
router.post("/", (req, res) => {
    Transaction.create(req.body, (error, transaction) => {
        if (error) {
            res.send(error);
        } else {
            res.send(transaction);
            console.log("new transaction successful");
            return transaction;
        }
    });
});

module.exports = router;