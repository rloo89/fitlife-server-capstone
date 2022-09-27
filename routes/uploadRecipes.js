const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");
const multer = require("multer");
const upload = multer({ dest: './public/images' })


//This function parses the json file

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


router.post("/",  upload.any(), (req, res) => {
    // Make a new recipe post
    const newRecipe = {
      id: crypto.randomUUID(),
      image: "image02.jpg",
      recipetitle: req.body.recipetitle,
      recipeintroduction: req.body.recipeintroduction,
      ingredients: req.body.ingredients,
      howto: req.body.howto,

    };

    // console.log(req.body);
    // console.log(req.files);
    // let test;
    // test.writeHead(200, {'Content-Type': 'image/jpeg', 'Content-Length': result.length});
    // test.end(new Buffer(result));
    // var data = req.files[0].buffer.replace(/^data:image\/\w+;base64,/, "");
    // var buf = Buffer.from(data, 'base64');
    // fs.writeFile(req.files[0].originalname, new Blob(req.files[0].buffer));
    // const imageBuffer = (req.body.ImageURLS)[0];
    // fs.writeFile("./public/images" + req.body.images[0], image);

//     var imageName = 'public/images/' + req.body.images[0];

    // fs.createWriteStream(imageName).write(imageBuffer);
   // 1. Read the current recipes array
    // 2. Add to the recipes array
    // 3. Write the entire new recipes array to the file
    const recipes = readRecipes();
    recipes.push(newRecipe);
    fs.writeFileSync("./data/recipes.json", JSON.stringify(recipes));
    res.status(201).json(newRecipe);
});


module.exports = router;