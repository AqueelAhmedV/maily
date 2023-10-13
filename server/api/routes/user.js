const router = require("express").Router()
const userFns = require("../../controllers/user")

router.get("/sample-user", userFns.getSampleUser)

module.exports = router