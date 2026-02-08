// brevoClient.js
const Sib = require("@sendinblue/client");

const brevo = new Sib.TransactionalEmailsApi();

// Set API key
brevo.setApiKey(
  Sib.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

module.exports = brevo;
