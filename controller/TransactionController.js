const express = require("express");
const router = express.Router();
const Transaction = require("../model/transaction");
const methodOverride = require("method-override");
router.use(methodOverride("_method"));

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
    Transaction.find(
        { _id: req.params.id },
        (error, transaction) => {
            res.send(transaction);
            return transaction;
        }
    );
    console.log("get one transaction");
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