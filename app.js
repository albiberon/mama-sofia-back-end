const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Recipe = require("./models/Recipe")

const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ origin: "*" }));

app.post("/recipe", async (request, response) => {
  try {
    var recipe = new Recipe(request.body);
    var result = await recipe.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/recipes", async (request, response) => {
  try {
    var result = await Recipe.find().exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/recipe/:id", async (request, response) => {
  try {
    var recipe = await Recipe.findById(request.params.id).exec();
    response.send(recipe);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.put("/recipe/:id", async (request, response) => {
  try {
    var recipe = await Recipe.findById(request.params.id).exec();
    recipe.set(request.body);
    var result = await recipe.save();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.delete("/recipe/:id", async (request, response) => {
  try {
    var result = await Recipe.deleteOne({ _id: request.params.id }).exec();
    response.send(result);
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get("/", function (req, res) {
  res.send("Hello Wooorld!");
});

mongoose.connect('mongodb+srv://admin-ates:admin-ates@cluster0-ms8ok.mongodb.net/recipesDB', { useNewUrlParser: true });

Recipe.find({}, function (err, foundItems) {
  Recipe.deleteMany();
  console.log(foundItems.length)
  //if (foundItems.length === 0) {
  //  Recipe.insertMany(defaultRecipes, function (err) {
  //    if (err) {
  //      console.log(err);
  //    } else {
  //      console.log("Successfully saved all the recipes to DB");
  //    }
  //  });
  //}

});

let port = process.env.PORT || 8081;

app.listen(port, function() {
  console.log("Server started successfully on port " + port);
});
