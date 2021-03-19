const userSeed = [
    {
        username: "user00",
        password: "user00",
        transactions: []
    },
    {
        username: "user01",
        password: "user01",
        transactions: []
    },
]

const transactionSeed = [
    {
        To: "user00",
        From: "user01",
        Amount: 11.10,
        Comment: "kfc meal"
    },
    {
        To: "user01",
        From: "user00",
        Amount: 1.70,
        Comment: "pilot pen"
    },
]

const dummyData = {
    userSeed: userSeed,
    transactionSeed: transactionSeed
}

module.exports = dummyData