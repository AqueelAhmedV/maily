const { db } = require('../database')
const nodemailer = require('nodemailer');
const { getTrackingPixel, getTimeSignature } = require('../utils/tracking');

exports.sendMail = async (req, res) => {
    console.log(req.body)
    let transporter = nodemailer.createTransport({
        host: "smtp.googlemail.com",
        service: "Gmail",
        secure: true,
        auth: {
            user: process.env.G_USER_EMAIL,
            pass: process.env.G_APP_PASS,
        }
    });
    let { recipients, subject, schedule, scheduleTime, tracking, mailBody, clientId, userId } = req.body
    try {
        let savedMail = await db.model("Mail").create({
            Subject: subject,
            Body: mailBody.html,
            UserId: userId,
            ClientId: clientId
        })
        console.log(savedMail)
        try {
            let info = await transporter.sendMail({
                from: process.env.G_USER_EMAIL,
                to: recipients.map((r) => r.Email),
                subject: subject,
                text: mailBody.plainText,
                html: mailBody.html + 
                (tracking ? getTrackingPixel(savedMail.MailId) : "") + (true?getTimeSignature():""), // PAID VERSION REMOVE SIGNATURE
            });
            console.log("message sent")
            // console.log("Message sent: %s", info.messageId);
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            return res.status(200).json({ msg: "success", preview: nodemailer.getTestMessageUrl(info) })
        } catch (err) {
            await savedMail.destroy()
            throw err;
        }
    }
    catch (err) {
        console.log(err)
        return res.status(400).json({ msg: "mail not send", error: err.data, val: err.message })
    }
}