require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;
// const video = require("./routes/videos");


const cors = require("cors");
app.use(express.json());

app.listen(PORT, () => {
    console.log("App has started at port " + PORT);
  });