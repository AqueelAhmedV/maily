const {db} = require("../database")
const { DataTypes } = require("sequelize")
const { uid } = require("uid")

const Mail = db.define("Mail", {
    MailId: {
        type: DataTypes.STRING,
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
        allowNull: false
    },
    ClientId: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
    },
    Views: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    ReadTimes: {
        type: DataTypes.ARRAY(DataTypes.DATE),
    },
})

Mail.beforeCreate((mail, _opts) => {
    if (!mail.ClientId || !Array.isArray(mail.ClientId) || mail.ClientId.length === 0)
        throw new Error("Client Id list cannot be empty")
    mail.setDataValue("MailId", "M"+uid(7))
})


module.exports = Mail