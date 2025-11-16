const nodeMailer = require("nodemailer");
const { default: brevo } = require("./brevoClient");
require("dotenv").config();

// creating mail controller
const updatesMailController = async (request, response) => {
  try {
    const { email, subject, html } = request.body;
    if (!email || !subject || !html) {
      return response
        .status(404)
        .json({ message: "required email subject and html content" });
    }

    // // creating transporter
    // const transporter = nodeMailer.createTransport({
    //   host: process.env.EMAIL_HOST,
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    await brevo.sendTransacEmail({
      sender: { email: process.env.EMAIL_FROM },
      to: [{ email }],
      subject: subject,
      htmlContent: html,
    });

    await transporter.sendMail(mailOptions);

    return response
      .status(201)
      .json({ message: "email has sent successfully" });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

module.exports = updatesMailController;
