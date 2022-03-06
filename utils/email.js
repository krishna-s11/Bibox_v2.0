const nodemailer  = require('nodemailer');

const sendEmail = async options => {
    // Create a Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'krishnasaxena69@gmail.com',
          pass: 'qwerty951753'
      }
      });

    const mailOptions = {
        from: 'krishnasaxena69@gmail.com',
        to: 'krishnasaxena798@gmail.com',
        subject: options.subject,
        text: options.message, 
        //html
    }

    await transporter.sendEmail(mailOptions, function(err) {
      if(err) console.log(err)
      else console.log('Email sent!');
    });
}

module.exports = sendEmail;