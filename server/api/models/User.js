const {db} = require("../database")
const { DataTypes } = require("sequelize")
const { uid } = require("uid")
const bcrypt = require("bcrypt")



const User = db.define('User', {
    // Model attributes are defined here
    UserId: {
      type: DataTypes.STRING,
      defaultValue: "U"+uid(7),
      primaryKey: true
    },
    Email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {msg: "Please enter a valid email address"}
      },
      unique: true
    },
    Password: {
      type: DataTypes.STRING,
      set(val) {
        if (!val || typeof val !== 'string' || val === '') {
          return this.setDataValue('Password', null)
        }
        const salt = bcrypt.genSaltSync(10)
        this.setDataValue('Password', bcrypt.hashSync(val, salt))
      },
      allowNull: false
    },
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    LastName: {
      type: DataTypes.STRING
    },
    FullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.FirstName} ${this.LastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `FullName` value!');
      }
    }
  }, {

  })

  module.exports = User