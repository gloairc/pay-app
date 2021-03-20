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
    console.log("req.query to search", req.query);
    console.log("req.query.startDate", req.query.startDate)
    // console.log(new Date(req.query.startDate));
    Transaction.find({ $or: [{ to: req.query.to }, { from: req.query.from }], createdAt: { $gte: new Date(new Date(req.query.startDate).setHours(00, 00, 00)), $lt: new Date(new Date(req.query.endDate).setHours(23, 59, 59)) } }, (error, transaction) => {
        if (error) {
            res.status(StatusCodes.BAD_REQUEST).send(error)
        } else {
            res.status(StatusCodes.OK).send(transaction);
        }
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