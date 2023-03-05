const router = require('express').Router()
const db = require('../../database')
const nodemailer = require('nodemailer')



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

router.post('/send', async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
  var mailData = req.body.data;
  // send mail with defined transport object
   try{
    let info = await transporter.sendMail({
    from: '"Maily App" '+mailData.from, // sender address
    to: mailData.recipients, // list of receivers
    subject: "Hello ✔", // Subject line
    text: mailData.mailBody.plainText, // plain text body
    html: mailData.mailBody.html, // html body
  });
   }
   catch (err) {
    return res.status(400).json({msg:"mail not send", error: err.data, val: err.message})
   }
  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  return res.status(200).json({msg: "success", preview: nodemailer.getTestMessageUrl(info)})

})

module.exports = router