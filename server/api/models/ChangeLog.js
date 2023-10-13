const { DataTypes } = require("sequelize")
const { db } = require("../database")

db.define("ChangeLog", {
    UserId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    TableName: {
        type: DataTypes.ENUM('Mail', 'Client'),
    },
    Operation: {
        type: DataTypes.ENUM('create', 'destroy', 'update')
    },
    RecordPk: {
        type: DataTypes.STRING
    },
    Data: {
        type: DataTypes.STRING
    },
    Seen: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
})