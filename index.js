require("dotenv").config();
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const { search } = require("./routes/uploadRecipes");
const app = express();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.json());

app.use("/images", express.static("./public/images"));


function readRecipes(){
  const recipesFile =fs.readFileSync("./data/recipes.json");
  const recipeData = JSON.parse(recipesFile);
  return recipeData
}



// 
const uploadrecipeRoute = require("./routes/uploadRecipes");
app.use("/uploadrecipe", uploadrecipeRoute);

app.get("/searchrecipes", (req, res)=>{
  let recipes = readRecipes();
  const searchTerm = req.query?.q
  if (searchTerm) {
    const searchTermLowerCase = searchTerm.toLowerCase()
    recipes = recipes.filter((recipe)=>{
      const lowerCaseRecipeTitle = recipe.recipetitle.toLowerCase()
      return lowerCaseRecipeTitle.includes(searchTermLowerCase)
    })
  }
  res.json(recipes);
})

app.listen(PORT, () => {
    console.log("App has started at port " + PORT);
  });