const { Sequelize } = require("sequelize")
const fs = require("fs")
// const sqlite = require("sqlite3")

const db = new Sequelize({
  dialect: 'sqlite',
  dialectModulePath: "sqlite3",
  storage: './db.sqlite',
});

module.exports = db;

for (model of fs.readdirSync("./models/"))
  require(`./models/${model}`)

// force sync all models and insert sample data
db.sync({force: true})
.then((newDb) => {
    console.log("All tables synced")
    const { User } = newDb.models
    User.create({
      firstName: "Test",
      lastName: "Aqueel",
      emailId: "test.aqueel.v@gmail.com",
      password: "damn"
    }).then(() => {}).catch(console.log)
})
.catch((err) => {
  console.log("Error syncing tables")
})