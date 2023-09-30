const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const mailRoutes = require('./routes/mail') 
const bodyParser = require('body-parser')

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const port = process.env.PORT || 8000;

app.use((req, res, next) => {
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    next();
})
app.use('/api/mail', mailRoutes)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})