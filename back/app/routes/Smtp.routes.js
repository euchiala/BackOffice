const nodemailer = require('nodemailer');
const multer = require('multer');
const os = require('os');

const upload = multer({ dest: os.tmpdir() });
module.exports = (app) => {
  app.post('/smtp', upload.single("file") , async (req, res) => {
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c0f7158fd8797c",
        pass: "2a83c23b667fba"
        // user: "6ad4c5f682551e",
        // pass: "155fbeded6a331"
      }
    });
    let file = req.file;
    const mailOptions = {
      from: 'sender@example.com',
      to: 'recipient@example.com',
      subject: 'New Form Submission',
      html: `
      <h1>New Form Submission</h1>
      <p>First Name: ${req.body.firstName}</p>
      <p>Last Name: ${req.body.lastName}</p>
      <p>Email: ${req.body.email}</p>
      <p>Phone: ${req.body.phone}</p>
      <p>LinkedIn: ${req.body.links}</p>
      <p>CIN: ${req.body.cin}</p>
    `,
      attachments: [
          {
            filename: file.originalname,
            path: file.path,
          }
        ],
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true };

  });
};
