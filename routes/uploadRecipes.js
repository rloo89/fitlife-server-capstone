const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");

//This function parses the json file

function readRecipes(){
    const recipesFile =fs.readFileSync("./data/recipes.json");
    const videoData = JSON.parse(recipesFile);
    return videoData
}

// GET all recipes

router.get("/", (req, res) => {
    const recipes = readRecipes();
    res.json(recipes);
});


router.post("/", (req, res) => {
    // Make a new recipe post
    const newRecipe = {
      id: crypto.randomUUID(),
      image: req.body.image,
      recipetitle: req.body.reciptitle,
      titleintroduction: req.body.recipeintroduction,
      ingredients: req.body.ingredients,
      howto: req.body.howto,

    };

   // 1. Read the current recipes array
    // 2. Add to the recipes array
    // 3. Write the entire new recipes array to the file
    const recipes = readRecipes();
    videos.push(newRecipe);
    fs.writeFileSync("./data/recipes.json", JSON.stringify(recipes));
    res.status(201).json(newRecipe);
});


module.exports = router;