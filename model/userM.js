const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        mobile: { type: Number, required: true, unique: true },
        password: { type: String, required: true },
        balance: { type: Number, required: true, default: 0 },
        transactions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Transactions",
                default: "",
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
