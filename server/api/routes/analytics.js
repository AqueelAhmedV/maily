const router = require('express').Router()
const analyticsFns = require("../../controllers/analytics")

router.get("/track-mail/:mailId", analyticsFns.trackMailView)
router.get("/list/:userId", analyticsFns.listAnalytics)

module.exports = router