 
import Sib from "@sendinblue/client";

const brevo = new Sib.TransactionalEmailsApi();

// Set API key
brevo.setApiKey(
  Sib.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export default brevo;
