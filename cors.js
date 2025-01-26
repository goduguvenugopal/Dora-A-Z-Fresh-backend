// require("dotenv").config()

// const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",")
 
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error("CORS access blocked"));
//     }
//   },
// };

// module.exports = corsOptions;


require("dotenv").config();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

const corsOptions = {
  origin: (origin, callback) => {
    // If the origin is in the allowed list
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } 
    // Block requests without an Origin header (Postman typically sends no origin)
    else if (!origin) {
      callback(new Error("CORS access blocked: No Origin header detected"));
    } 
    // For all other cases, block access
    else {
      callback(new Error("CORS access blocked: Origin not allowed"));
    }
  },
};

module.exports = corsOptions;
