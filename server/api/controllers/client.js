const { Op } = require('sequelize');
const {db} = require('../../database')



// @method GET
// @route /stream/:userId
exports.streamClientList = async (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache",
        Connection: "keep-alive", // allowing TCP connection to remain open for multiple HTTP requests/responses
        "Content-Type": "text/event-stream", // media type for Server Sent Events (SSE)
      });
    res.flushHeaders();
    let intervalId = setInterval(() => {
        db.model("ChangeLog").findOne({
            order: [['id', 'DESC']],
            where: {
                UserId: req.params.userId,
                Seen: false
            },
            logging: false
        }).then((evt) => {
            // console.log(JSON.stringify(changes))
            console.log("HEHE")
            if (evt ) {
                evt.setDataValue("Seen", true)
                evt.save().then(() => {
                    console.log("HUHU")
                    res.write(`data: ${JSON.stringify(evt)}\n\n`);
                })                
            }
        });
    }, 2000)
    res.on("close", () => {
        clearInterval(intervalId)
        res.end()
    })
}

// @method GET
// @route /list/:userId
exports.listAllUserClients = async (req, res) => {
    try {
        console.log("here", req.params)
        let clients = await db.model("Client").findAll({
            where: {
                UserId: req.params.userId
            }
        })
        // console.log(clients)
        // console.log(db.models)
        if (!clients || clients.length === 0)
            return res.status(404).json({msg: "No clients yet"})
        return res.status(200).json(clients.map(c => c.dataValues))
    } catch (err) {
        res.status(500).json(err)
    }
}

// @method POST
// @route /add
exports.addClient = async (req, res) => {
    try {
        console.log(req.body)
        let newClient = await db.model("Client").create(req.body)
        res.status(200).json({msg: "Succesfully added client", newClient})
    } catch (err) {
        res.status(500).json(err)
    }
}

// @method POST
// @route /delete
exports.removeClient = async (req, res) => {
    try {
        await db.model("Client").destroy({
            where: req.body
        })
        res.status(200).json({msg: "Succesfully deleted client"})
    } catch (err) {
        res.status(500).json(err)
    }
}