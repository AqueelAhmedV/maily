const router = require('express').Router()
const db = require('../database')
const fs = require('fs')
const path = require("path")

router.get("/track-mail", async (req, res) => {
    console.log("Mail opened")
    console.log(req)
    res.setHeader("Content-Type", "image/webp");
    res.send(fs.readFileSync(path.resolve(__dirname, "../assets/1.png")))
})

module.exports = router