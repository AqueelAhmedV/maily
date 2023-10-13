const router = require('express').Router()
const clientFns = require("../controllers/client")

router.get("/stream/:userId", clientFns.streamClientList)
router.get("/list/:userId", clientFns.listAllUserClients)
router.post("/add", clientFns.addClient)
router.post("/delete", clientFns.removeClient)


module.exports = router