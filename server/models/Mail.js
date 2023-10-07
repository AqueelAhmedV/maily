const db = require("../database")
const { DataTypes, DATE } = require("sequelize")
const { uid } = require("uid")

const Mail = db.define("Mail", {
    id: {
        type: DataTypes.STRING,
        defaultValue: "M"+uid(7),
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    body: {
        type: DataTypes.TEXT
    },
    from: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        },
        allowNull: false,
        references: {
            model: "User",
            key: "emailId"
        }
    },
    to: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
        },
        allowNull: false
    },
    views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    sentTime: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    readTimes: {
        type: DataTypes.ARRAY(DataTypes.DATE)
    },
})

module.exports = Mail