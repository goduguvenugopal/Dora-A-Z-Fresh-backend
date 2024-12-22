const nodeMailer = require("nodemailer");
require("dotenv").config();
const crypto = require("crypto");
require("dotenv").config();
const User = require("../model/User");
const jwt = require("jsonwebtoken");

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
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // generating 6 digits otp
    const otp = crypto.randomInt(100000, 999999);
    otpStore[email] = otp;

    // send otp
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject:
        "Dora A-Z Fresh: Your Login One-Time Password (OTP) for Verification",
      html: `
  <html>
    <body>
      <h2>Welcome to Dora A-Z Fresh!</h2>
      <p>Dear ${fullName}</p>
      <p>Your One-Time Password (OTP) for logging in to your Dora A-Z Fresh account is : <strong>${otp}</strong>.</p>
      <p><em>Please do not share this OTP with anyone. It is for your secure login only.</em></p>
      <p>If you didn't request this OTP, please ignore this email or contact our support team.</p>
      <p>Thank you for choosing Dora A-Z Fresh!</p>
      <p>Best regards,<br />The Dora A-Z Fresh</p>
    </body>
  </html>
`,
    };
    await transporter.sendMail(mailOptions);
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
    if (!email || !otp || !fullName)
      return res.status(400).send("Email and OTP are required");

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
          .json({ message: "Login otp verified successful", token });
      } else if (foundUser) {
        // generating jwt if user already logged in
        const token = jwt.sign({ userId: foundUser._id }, secretKey);
        return response
          .status(200)
          .json({ message: "Login otp verified successful", token });
      }
    }

    return response.status(401).json({ message: "Login otp is Invalid" });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

module.exports = { sendMail, verifyOtp };
