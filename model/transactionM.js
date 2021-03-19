const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
    {
        to: { type: String, required: true },
        from: { type: String, required: true },
        amount: { type: Number, required: true },
        comment: { type: String, required: true },
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transactions", transactionSchema);

module.exports = Transaction;
