const db = require("../database")
const { DataTypes } = require("sequelize")
const { uid } = require("uid")
const bcrypt = require("bcrypt")


const User = db.define('User', {
    // Model attributes are defined here
    id: {
      type: DataTypes.STRING,
      defaultValue: "U"+uid(7),
      allowNull: false,
      primaryKey: true
    },
    emailId: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {msg: "Please enter a valid email address"}
      },
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      set(val) {
        if (!val || typeof val !== 'string' || val === '') {
          return this.setDataValue('password', null)
        }
        const salt = bcrypt.genSaltSync(10)
        this.setDataValue('password', bcrypt.hashSync(val, salt))
      },
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      }
    }    
  }, {
    
  })

  module.exports = User