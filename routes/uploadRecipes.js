const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");


//This function parses the json file
function hexToBase64(str) {
        return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}


function readRecipes(){
    const recipesFile =fs.readFileSync("./data/recipes.json");
    const recipeData = JSON.parse(recipesFile);
    return recipeData
}

// GET all recipes

router.get("/", (req, res) => {
    const recipes = readRecipes();
    res.json(recipes);
});


router.post("/", (req, res) => {
    // Make a new recipe post
    const file = req.files.file;
    const newRecipe = {
      id: crypto.randomUUID(),
      image: file.name,
      recipetitle: req.body.recipetitle,
      recipeintroduction: req.body.recipeintroduction,
      ingredients: req.body.ingredients,
      howto: req.body.howto,

    };


    file.mv(`./public/images/${file.name}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
      });
   // 1. Read the current recipes array
    // 2. Add to the recipes array
    // 3. Write the entire new recipes array to the file
    const recipes = readRecipes()
    recipes.push(newRecipe);
    fs.writeFileSync("./data/recipes.json", JSON.stringify(recipes));
    res.status(201).json(newRecipe);
});


module.exports = router;