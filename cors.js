require("dotenv").config()

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",")
 
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("CORS access blocked"));
    }
  },
};

module.exports = corsOptions;
