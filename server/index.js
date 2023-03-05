const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()
const mailRoutes = require('./api/routes/mail') 

app.use(cors())

const port = process.env.PORT || 8000;

app.use('/api/mail', mailRoutes)

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})