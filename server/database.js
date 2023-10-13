const { Sequelize } = require("sequelize")
const fs = require("fs")
const sqlite = require("sqlite3");
const path = require("path");


const db = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  dialectModule: sqlite,
});


function intializeDb(db, isForced) {
  return new Promise(async (resolve, reject) => {
      try {
          let syncedDb = await db.sync({force: isForced})
          const { User } = syncedDb.models
         let testUser =  await User.create({
          FirstName: "Test",
          LastName: "Aqueel",
          Email: "test.aqueel.v@gmail.com",
          Password: "debramorgan",
          })
          resolve({msg: "All tables synced, initialized DB", testUser})
      } catch (err) {
          reject(err)
      }
  })
}

module.exports = {db, intializeDb};