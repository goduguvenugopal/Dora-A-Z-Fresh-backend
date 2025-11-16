const nodeMailer = require("nodemailer");
require("dotenv").config();
const crypto = require("crypto");
require("dotenv").config();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const { default: brevo } = require("./brevoClient");

const secretKey = process.env.SECRETKEY;

let otpStore = {};

// creating login otp controller
const sendMail = async (request, response) => {
  try {
    const { email, fullName } = request.body;
    if (!email) {
      return response.status(404).json({ message: "required credentials" });
    }
    // Nodemailer transporter
    // const transporter = nodeMailer.createTransport({
    //   host: process.env.EMAIL_HOST,
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    // generating 6 digits otp
    const otp = crypto.randomInt(100000, 999999);
    otpStore[email] = otp;

    // mailOptions
    await brevo.sendTransacEmail({
      sender: { email: process.env.EMAIL_FROM },
      to: [{ email }],
      subject: "Your One-Time Password (OTP) for Secure Login - Dora A-Z Fresh",
      htmlContent: `
    <html>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #2E7D32;">Welcome to Dora A-Z Fresh!</h2>
          <p>Dear <strong>${fullName}</strong>,</p>
          <p>Your one-time password (OTP) for logging in to your Dora A-Z Fresh account is:</p>
          <p style="font-size: 22px; font-weight: bold; color: #d32f2f;">${otp}</p>
          <p style="color: #555;"><em>⚠️ Please do not share this code with anyone for your security.</em></p>
          <br />
          <p>Thank you for trusting <strong>Dora A-Z Fresh</strong> for your daily needs!</p>
          <p>Best regards,<br /><strong>The Dora A-Z Fresh Team</strong></p>
        </div>
      </body>
    </html>
  `,
    })

    // await transporter.sendMail(mailOptions);
    return response
      .status(201)
      .json({ message: "Login otp sent successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "internal server error", error });
  }
};

// verifying login otp and saving credentials in databse
const verifyOtp = async (request, response) => {
  try {
    const { email, fullName, otp } = request.body;
    if (!email || !otp || !fullName) {
      return response.status(400).send("Email and login code are required");
    }

    if (otpStore[email] && otpStore[email] === parseInt(otp)) {
      delete otpStore[email];

      // checking user in database
      const foundUser = await User.findOne({ email });

      if (!foundUser) {
        const defaultValue = "user";
        const newUser = new User({
          fullName,
          email,
          role: defaultValue,
        });

        // saving user Credentials if new user in db
        const savedUser = await newUser.save();
        const token = jwt.sign({ userId: savedUser._id }, secretKey);
        return response
          .status(200)
          .json({ message: "Login code verified successful", token });
      } else if (foundUser) {
        // generating jwt if user already logged in
        const token = jwt.sign({ userId: foundUser._id }, secretKey);
        return response
          .status(200)
          .json({ message: "Login code verified successful", token });
      }
    } else {
      return response.status(401).json({ message: "Login code is Invalid" });
    }
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

module.exports = { sendMail, verifyOtp };
