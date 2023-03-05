const router = require('express').Router()
const db = require('../../database')

router.get('/list', (req, res) => {
    db.all('SELECT * from clients', (err, data) => {
        if(err){
            console.log(err)
            return res.status(404).json(err)
        } else {
            return res.status(200).json({clients: data})
        }
    })
})

module.exports = router