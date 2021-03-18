const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        To: { type: String, required: true },
        From: { type: String, required: true },
        Amount: { type: Number, required: true },
        Comment: { type: String, required: true },
    },
    { timestamps: true }
);

const Transactions = mongoose.model("Transactions", transactionSchema);

module.exports = Transactions;
