const router = require('express').Router()
const db = require('../../database')
const mailFns = require("../../controllers/mail")

router.get('/list', async (req, res) => {
    try {
      const clients = await db.model("Client").findAll()
      res.status(200).json({clients})
    } catch(err) {
      res.status(404).json(err)
    }
    
})

router.post('/send', mailFns.sendMail)

module.exports = router