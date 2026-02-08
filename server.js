const app = require("./app");
const mongodbConnection = require("./mongodb");

const port = process.env.PORT || 3000;

 
 



const startServer = async () => {
  try {
    await mongodbConnection();

    // Start your Express server only after successful DB connection
    app.listen(port, () => {
      console.log(`server is running at port number : ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

startServer();
