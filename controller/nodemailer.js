const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.smtpEmail,
      pass: process.env.smtpPassword,
    },
    });

const sendOtpTNSSite = async(req, res) => {
    console.log("Entered");
    try {
     data = req.body
     const name = req.body.name || 'Anonymous User';
     const subject = req.body.subject || 'Empty';
     const message = req.body.message || 'Empty';
     const email = req.body.email || 'Empty';
     const mailOptions = {
       from: process.env.smtpEmail,
       to: process.env.sendEmailto,
       subject: `[inquiry] ${subject}`,
       text: `Name: ${name},\nEmail: ${email}\nMessage: ${message}` // Constructing text with name and message
     };
     
   
     transporter.sendMail(mailOptions, async (error, info) => {
       if (error) {
         console.log('Error sending email:', error);
         res.status(400).json({
           statusCode: 400,
           error: 'Error sending Email',error });
       } else {
     console.log('Generated InqueryEmail: tnsWebsite');
       await  res.json(true);// need to change encryption
       }
     });
    } catch (error) {
     console.log('send Email error', error);
    }
   };
   module.exports = {sendOtpTNSSite}