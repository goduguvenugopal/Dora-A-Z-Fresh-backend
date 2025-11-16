import { google } from "googleapis";
import base64url from "base64url";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

export async function sendEmail({ to, subject, html, text }) {
  try {
    const gmail = google.gmail({ version: "v1", auth: oauth2Client });

    const messageParts = [
      `From: ${process.env.EMAIL_USER}`,
      `To: ${to}`,
      `Subject: ${subject}`,
      "MIME-Version: 1.0",
      'Content-Type: text/html; charset="UTF-8"',
      "",
      html || text,
    ];

    const raw = base64url(messageParts.join("\n"));

    const response = await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw },
    });

    return response.data;
  } catch (err) {
    console.error("Gmail API Error:", err);
    throw err;
  }
}
