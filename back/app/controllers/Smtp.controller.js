const nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c0f7158fd8797c",
    pass: "2a83c23b667fba"
  }
});

const mailOptions = {
  from: 'sender@example.com',
  to: 'recipient@example.com',
  subject: 'New Form Submission',
  html: `
          <h1>New Form Submission</h1>
          <p>First Name: ${formData.firstName}</p>
          <p>Last Name: ${formData.lastName}</p>
          <p>Email: ${formData.email}</p>
          <p>Phone: ${formData.phone}</p>
          <p>LinkedIn: ${formData.links}</p>
          <p>CIN: ${formData.cin}</p>
        `,
  // attachments: [
  //     {
  //       filename: file.originalname,
  //       content: file.buffer,
  //     }
  //   ],
};

const info = await transporter.sendMail(mailOptions);
console.log('Email sent:', info.messageId);
return { success: true };


module.exports = SmtpService;
