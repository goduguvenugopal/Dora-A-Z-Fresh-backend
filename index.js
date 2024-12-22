const express = require("express");
const app = express();
const cors = require("cors");
const mongodbConnection = require("./mongodb");
const corsOptions = require("./cors");
require("dotenv").config();
const emailRoute = require("./routes/emailRoute");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoute");
const cartRoute = require("./routes/cartRoute");
const carouselRoute = require("./routes/carouselRoute");
const categoryRoute = require("./routes/categoryRoute");
const addressRoute = require("./routes/shippingAdressRoute");
const orderRoute = require("./routes/orderRoute");
const updatesMailRoute = require("./routes/updatesMailRoute");


// server port
const port = process.env.PORT || 3000;

// mongodb function calling here
mongodbConnection();

// middlewares
app.use(cors(corsOptions));
app.use(express.json());

// route middlewares
app.use("/email", emailRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);
app.use("/carousel", carouselRoute);
app.use("/category", categoryRoute);
app.use("/address", addressRoute);
app.use("/order", orderRoute);
app.use("/updates-email",updatesMailRoute)

// server listens function
app.listen(port, () => {
  console.log(`server is running at port number : ${port}`);
});
