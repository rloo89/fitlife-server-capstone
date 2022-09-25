require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.json());


// 
const uploadrecipeRoute = require("./routes/uploadRecipes");
app.use("/uploadrecipes", uploadrecipeRoute);


app.listen(PORT, () => {
    console.log("App has started at port " + PORT);
  });