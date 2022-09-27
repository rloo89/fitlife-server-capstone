require("dotenv").config();
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.json());


function readRecipes(){
  const recipesFile =fs.readFileSync("./data/recipes.json");
  const recipeData = JSON.parse(recipesFile);
  return recipeData
}



// 
const uploadrecipeRoute = require("./routes/uploadRecipes");
app.use("/uploadrecipe", uploadrecipeRoute);

app.get("/searchrecipes", (req, res)=>{
  const recipes = readRecipes();
  const searchTerm = req.query.q
  const searchTermLowerCase = searchTerm.toLowerCase()
  const filteredRecipes = recipes.filter((recipe)=>{
    const lowerCaseRecipeTitle = recipe.recipetitle.toLowerCase()
    return lowerCaseRecipeTitle.includes(searchTermLowerCase)
  })
  res.json(filteredRecipes);
})

app.listen(PORT, () => {
    console.log("App has started at port " + PORT);
  });