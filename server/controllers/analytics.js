const { db } = require("../database")
const fs = require('fs')
const path = require("path")
const { Op } = require("sequelize")


exports.trackMailView = async (req, res) => {
    console.log("Mail opened")
    // console.log(req)
    try {
        let mailRecord = await db.model("Mail").findByPk(req.params.mailId)
        if (!mailRecord) console.log("not found")
        if (mailRecord) {
            console.log(mailRecord)
            let newReadTimes = JSON.parse(mailRecord.ReadTimes)
            newReadTimes.push(new Date())
            newReadTimes = JSON.stringify(newReadTimes)
            console.log(newReadTimes)
            mailRecord.ReadTimes = newReadTimes
            mailRecord.Views += 1
        }
        await mailRecord.save()
    } catch (err) {
        console.log(err)
    }
    res.setHeader("Content-Type", "image/png");
    res.send(fs.readFileSync(path.resolve(__dirname, "../assets/1.png")))
}

exports.listAnalytics = async (req, res) => {
    console.log("analytics", req.params)
    try {
        let analyticsData = await db.model("Mail").findAll({
            where: {
                UserId: req.params.userId,
            }
        })
        console.log(analyticsData)
        if (!analyticsData)
            return res.status(404).json({ msg: "No Analytics Data Found" })
        // let clients = await db.model("Client").findAll({
        //     where: {
        //         ClientId: {
        //             [Op.in]: 
        //         }
        //     },
        //     attributes: ['Email', 'ClientId', 'FirstName', 'LastName']
        // })
        // if (!clients)
        //     return res.status(404).json("No clients found for email")

        res.status(200).json(
            analyticsData.map((d) => d.dataValues)
        )
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}