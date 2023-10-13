const {db} = require("../database")
const { DataTypes, DATE } = require("sequelize")
const { uid } = require("uid")

const Mail = db.define("Mail", {
    MailId: {
        type: DataTypes.STRING,
        defaultValue: "M"+uid(7),
        primaryKey: true
    },
    Subject: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Body: {
        type: DataTypes.TEXT
    },
    UserId: {
        type: DataTypes.STRING,
        references: {
            model: "User",
            key: "UserId"
        }
    },
    ClientId: {
        type: DataTypes.STRING,
        references: {
            model: "Client",
            key: "ClientId"
        }
    },
    Views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    SentTime: {
        type: DataTypes.DATE,
        defaultValue: new Date()
    },
    ReadTimes: {
        type: DataTypes.ARRAY(DataTypes.DATE)
    },
})

module.exports = Mail