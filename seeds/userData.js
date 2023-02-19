const { User } = require('../models')

const userData = [
    {
        username: "techDood123",
        password: "Password123456"
    },
    {
        username: "GirlsWhoCode29",
        password: "Password123456"
    },
    {
        username: "ILOVESQL4545",
        password: "Password123456"
    },
    {
        username: "CodingKing79",
        password: "Password123456"
    }
]

const seedUserData = () => User.bulkCreate(userData)

module.exports = seedUserData;

