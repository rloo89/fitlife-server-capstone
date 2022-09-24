require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
// const video = require("./routes/videos");

const cors = require("cors");
app.use(express.json());



// This middleware is a basic example that runs on every request
app.use((req, res, next) => {
    console.log("Incoming request");
    next();
  });


app.listen(PORT, () => {
    console.log("App has started at port " + PORT);
  });