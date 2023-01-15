const nodemailer = require("nodemailer");

const sendEmail = async (option) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.SMTP_USER, // sender address
    to: option.email, // list of receivers
    subject: option.subject, // Subject line
    html: option.message,
  });
};

module.exports = sendEmail;
