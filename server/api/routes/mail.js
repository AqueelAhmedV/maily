const router = require('express').Router()
const db = require('../database')
const nodemailer = require('nodemailer')



router.get('/list', async (req, res) => {
    // db.all('SELECT * from clients', (err, data) => {
    //     if(err){
    //         console.log(err)
    //         return res.status(404).json(err)
    //     } else {
    //         return res.status(200).json({clients: data})
    //     }
    // })
    try {
      const users = await db.model("User").findAll()
      res.status(200).json({clients: users})
    } catch(err) {
      res.status(404).json(err)
    }
    
})

router.post('/send', async (req, res) => {
  // create reusable transporter object using the default SMTP transport
  // console.log(process.env)
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
  var mailData = req.body.data;
  // send mail with defined transport object
   try{
    let info = await transporter.sendMail({
    from: process.env.G_USER_EMAIL, // sender address
    to: mailData.recipients.map((r) => r.emailId), // list of receivers
    subject: "Hello ✔", // Subject line
    text: mailData.mailBody.plainText, // plain text body
    html: mailData.mailBody.html, // html body
  }
  );
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  return res.status(200).json({msg: "success", preview: nodemailer.getTestMessageUrl(info)})
   }
   catch (err) {
    console.log(err)
    return res.status(400).json({msg:"mail not send", error: err.data, val: err.message})
   }
  


})

module.exports = router