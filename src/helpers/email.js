const nodemailer = require('nodemailer')

const sendMail = (data) => {
  return new Promise((resolve, reject) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'ppia3236@gmail.com',
        pass: process.env.PASS_ADMIN
      }
    })
    const mailOptions = {
      from: '"Tickitz" <ppia3236@gmail.com>', // sender address
      to: data.to, // list of receivers
      subject: data.subject, // Subject line
      html: data.html,// plain text body
      context: data.data, // DATA YANG NNTI BSA DIMASUKAN KE DALAM TEMPLATE
    }
    transporter.sendMail(mailOptions, function (err, info) {
      if (err) {
        reject(err);
      } else {
        // console.log(`Email sent !${info.response}`);
        resolve(info.response);
      }
    })
  })
}

