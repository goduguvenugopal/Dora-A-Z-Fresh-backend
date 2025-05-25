require("dotenv").config();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

const corsOptions = {
  origin: (origin, callback) => {
    // If the origin is in the allowed list and header passed
    if (origin && allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS access blocked: Origin not allowed"));
    }
  },
};

module.exports = corsOptions;
