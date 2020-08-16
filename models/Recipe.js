const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "item is required"],
    },
    imgURL: String,
    shortDescription: {
        type: String,
        required: [true, "item is required"],
    },
    preparation: {
        type: String,
        required: [true, "item is required"],
    },
    tags: [String],
    category: [String],
    ingredients: [String],
    time: String,
    portion: String,
    nutritionalValues: {
        kcal: String,
        fat: String,
        saturates: String,
        carbs: String,
        sugars: String,
        fibre: String,
        protein: String,
        salt: String,
    },
});
const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;