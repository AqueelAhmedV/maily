const router = require('express').Router()
const db = require('../database')
const fs = require('fs')
const path = require("path")

router.get("/track-mail", async (req, res) => {
    console.log(req)
    res.setHeader("Content-Type", "image/webp");
    res.send(fs.readFileSync(path.resolve(__dirname, "../assets/1x1.webp")))
})

module.exports = router