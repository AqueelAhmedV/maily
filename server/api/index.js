const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const mailRoutes = require('./routes/mail') 
const analyticsRoutes = require("./routes/analytics")
const clientRoutes = require("./routes/client")
const userRoutes = require("./routes/user")
const bodyParser = require('body-parser')
const {db, intializeDb} = require("../database")

app.use(cors({
    origin: "*",
}))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = process.env.PORT || 8000;

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    next();
})


app.use('/api/mail', mailRoutes)
app.use('/api/analytics', analyticsRoutes)
app.use('/api/client', clientRoutes)
app.use('/api/user', userRoutes)

for (model of ["ChangeLog.js", "Client.js", "User.js", "Mail.js"])
  require(`../models/${model}`)

// sync all models and insert sample data
intializeDb(db, true)
.then(({msg, testUser}) => {
    console.info(msg, testUser.dataValues.UserId, db.models)
    app.listen(port, () => {
        console.info(`Server listening on port ${port}`)
    })
})
.catch(console.log)