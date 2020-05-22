const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

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

//Define request response in root URL (/)
app.get("/", function (req, res) {
  res.send("Hello Wooorld!");
});

// mongoose.connect("mongodb://localhost:27017/recipesDB", {
//   useNewUrlParser: true,
// });
mongoose.connect('mongodb+srv://admin-ates:admin-ates@cluster0-ms8ok.mongodb.net/recipesDB', { useNewUrlParser: true });

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

const recipe1 = new Recipe({
  name: "Caponata pasta",
  imgURL:
    "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2019/02/caponata-pasta.jpg",
  shortDescription:
    "Whip up our easy vegetarian caponata pasta in just 20 minutes.",
  preparation: `Heat the oil in a large pan and cook the onion for 8-10 mins until starting to caramelise (or for longer if you have time – the sweeter the better). Add the garlic for the final 2 mins of cooking time.
  Tip in the mixed veg, tomatoes, capers and raisins. Season well and simmer, uncovered, for 10 mins, or until you have a rich sauce.
  Meanwhile, boil the kettle. Pour the kettleful of water into a large pan with a little salt and bring back to the boil. Add the pasta and cook until tender with a little bite, then drain, reserving some of the pasta water. Tip the pasta into the sauce, adding a splash of pasta water if it needs loosening. Scatter with the basil leaves and parmesan, if you like, and serve straight from the pan`,
  category: "dinner",
  ingredients: [
    "4 tbsp olive oil (or use the oil from your chargrilled veg, see below)",
    "1 large onion , finely chopped",
    "4 garlic cloves, finely sliced",
    "250g chargrilled Mediterranean veg (peppers and aubergines, if possible) from a jar, pot or deli counter, drained if in oil (you can use this oil in place of the olive oil) and roughly chopped",
    "400g can chopped tomatoes",
    "1 tbsp small capers",
    "2 tbsp raisins",
    "350g rigatoni, penne or another short pasta shape",
    "bunch basil, leaves picked",
  ],
  time: "20mins",
  portion: "for 4",
  nutritionalValues: {
    kcal: "542",
    fat: "14g",
    saturates: "2g",
    carbs: "85g",
    sugars: "21g",
    fibre: "9g",
    protein: "14g",
    salt: "0.5g",
  },
});

const recipe2 = new Recipe({
  name: "Coconut & squash dhansak",
  imgURL:
    "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/coconut-squash-dhansak.jpg",
  shortDescription:
    "This easy vegetarian curry is perfect for a healthy dinner",
  preparation: `Heat the oil in a large pan. Put the squash in a bowl with a splash of water. 
Cover with cling film and microwave on High for 10 mins or until tender. 
Meanwhile, add the onions to the hot oil and cook for a few mins until soft. Add the curry paste, tomatoes and coconut milk, and simmer for 10 mins until thickened to a rich sauce.
Warm the naan breads in a low oven or in the toaster. Drain any liquid from the squash, then add to the sauce with the lentils, spinach and some seasoning. 
Simmer for a further 2-3 mins to wilt the spinach, then stir in the coconut yogurt. Serve with the warm naan and a dollop of extra yogurt.`,
  category: "lunch",
  ingredients: [
    "1 tbsp vegetable oil",
    "500g butternut squash (about 1 small squash), peeled and chopped into bite-sized chunks (or buy a pack of ready-prepared to save time), see tip, below left",
    "100g frozen chopped onions",
    "4 heaped tbsp mild curry paste (we used korma)",
    "400g can chopped tomatoes",
    "400g can light coconut milk",
    "Mini naan bread, to serve",
    "400g can lentils, drained",
    "200g bag baby spinach",
  ],
  time: "20mins",
  portion: "for 4",
  nutritionalValues: {
    kcal: "320",
    fat: "17g",
    saturates: "9g",
    carbs: "29g",
    sugars: "17g",
    fibre: "7g",
    protein: "9g",
    salt: "1g",
  },
});

const recipe3 = new Recipe({
  name: "Indian chickpeas with poached eggs",
  imgURL:
    "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/05/indian-chickpeas-with-poached-eggs.jpg",
  shortDescription:
    "This quick, fibre-rich veggie supper is filling and good for you too.",
  preparation: `Heat the oil in a non-stick sauté pan, add the garlic, pepper, chilli and the whites from the spring onions, and fry for 5 mins over a medium-high heat. Meanwhile, put a large pan of water on to boil.Add the spices, tomatoes, most of the coriander and the chickpeas to the sauté pan and cook for 1-2 mins more. 
Stir in the bouillon powder and enough liquid from the chickpeas to moisten everything, and leave to simmer gently. 
Once the water is at a rolling boil, crack in your eggs and poach for 2 mins, then remove with a slotted spoon. Stir the spring onion tops into the chickpeas, then very lightly crush a few of the chickpeas with a fork or potato masher. 
Spoon the chickpea mixture onto plates, scatter with the reserved coriander and top with the eggs. Serve with an extra sprinkle of cumin, if you like.`,
  category: "lunch",
  ingredients: [
    "1 tbsp rapeseed oil",
    "2 garlic cloves, chopped",
    "1 yellow pepper, deseeded and diced",
    "½ - 1 red chilli, deseeded and chopped",
    "½ bunch spring onions(about 5), tops and whites sliced but kept separate",
    "1 tsp cumin, plus a little extra to serve (optional)",
    "1 tsp coriander",
    "½ tsp turmeric",
    "3 tomatoes, cut into wedges",
  ],
  time: "10mins",
  portion: "for 4",
  nutritionalValues: {
    kcal: "471",
    fat: "15g",
    saturates: "8g",
    carbs: "63g",
    sugars: "8g",
    fibre: "8g",
    protein: "18g",
    salt: "2.7g",
  },
});

const recipe4 = new Recipe({
  name: "Sweetcorn & courgette fritters",
  imgURL:
    "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/07/sweetcorn-courgette-fritters.jpg",
  shortDescription:
    "An easy, vegetarian fritter you can have on the table in 25 minutes.",
  preparation: `Mix the sweetcorn, spring onions, courgette, paprika, flour, beaten egg, milk and some seasoning in a large bowl and set aside. 
Put a large pan of water on to boil. In a bowl, mix the chilli sauce with the lime juice and set aside. 
Heat the oil in a large, non-stick pan and spoon in four burger-sized mounds of the fritter mixture, spaced apart (you may need to do this in two batches). 
When brown on the underside, turn over and cook for 3 mins more until golden.Meanwhile, poach the eggs in the simmering water for 2-3 mins until cooked and the yolks are runny. 
Remove with a slotted spoon. Serve the fritters topped with a poached egg, mixed leaves and a drizzle of the chilli dressing.`,
  category: "dinner",
  ingredients: [
    "198g can sweetcorn, drained",
    "2 spring onions, finely chopped",
    "50g courgette , grated",
    "1 tsp smoked paprika",
    "50g self-raising flour",
    "5 eggs, 1 beaten, 4 for poaching",
    "40ml milk",
    "4 tbsp sweet chilli sauce",
    "juice 1 lime",
    "1 tbsp vegetable oil",
    "mixed leaves, to serve",
  ],
  time: "25mins",
  portion: "for 2",
  nutritionalValues: {
    kcal: "465",
    fat: "21g",
    saturates: "5g",
    carbs: "44g",
    sugars: "20g",
    fibre: "5g",
    protein: "23g",
    salt: "1.7g",
  },
});

const recipe5 = new Recipe({
  name: "Spiced halloumi & pineapple burger",
  imgURL:
    "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2018/07/halloumi-burger.jpg",
  shortDescription:
    "Pack four of your 5-a-day into these tasty veggie burgers.",
  preparation:
    "Heat the barbecue. Put the cabbage, carrot, radish and coriander in a bowl. Pour over the lime juice, add ½ tbsp oil and the chilli flakes, then season with salt and pepper. Give everything a good mix with your hands. This can be done a few hours before and kept in the fridge. Mix the remaining oil with the chipotle paste then coat the halloumi slices in the mixture. Put the halloumi slices on a sheet of foil and put on the barbecue with the pineapple (or use a searing hot griddle pan if cooking inside). Cook for 2 mins on each side until the cheese is golden, and the pineapple is beginning to caramelise. Brush the buns with the remaining chipotle oil, then put your burger buns, if using, cut-side down, on the barbecue for the last 30 seconds of cooking to toast. Assemble your burgers with the lettuce or buns. Start with a handful of the slaw, then add halloumi and pineapple. Serve with the remaining slaw.",
  category: "lunch",
  ingredients: [
    "½ red cabbage, grated",
    "2 carrots, grated",
    "100g radishes, sliced",
    "1 small pack coriander, chopped",
    "2 limes, juiced",
    "1 tbsp cold-pressed rapeseed oil",
    "big pinch of chilli flakes",
    "1 tbsp chipotle paste",
    "60g halloumi, cut into 4 slices",
    "2 small slices of fresh pineapple",
    "1 Little Gem lettuce, divided into 4 lettuce cups, or 2 small seeded burger buns, cut in half, to serve (optional)",
  ],
  time: "10mins",
  portion: "for 2",
  nutritionalValues: {
    kcal: "264",
    fat: "14g",
    saturates: "5g",
    carbs: "19g",
    sugars: "18g",
    fibre: "10g",
    protein: "11g",
    salt: "1.2g",
  },
});

const recipe6 = new Recipe({
  name: "Veggie Chinese pancakes",
  imgURL:
    "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/user-collections/my-colelction-image/2015/12/recipe-image-legacy-id--1215468_10.jpg",
  shortDescription:
    "Anthea Hawdon's practical vegetarian pancakes with hoisin sauce.",
  preparation: `Heat a small frying pan. Add the mushrooms, soy, five-spice, rice wine, sesame oil and sugar. Stir until the mushrooms are cooked and the sauce is thick, bubbling and clinging to the mushrooms. Warm the pancakes – steam them or heat them in the microwave.
    Serve the mushrooms, spring onions, cucumber, lettuce and hoisin sauce in separate dishes, with the pancakes alongside.
    To assemble, spread a pancake, with a little hoisin sauce. Add some mushrooms, onions, cucumber and lettuce. Fold the pancake and enjoy.`,
  category: "breakfast",
  ingredients: [
    "200g mushroom, sliced (we used chestnut)",
    "2 tbsp soy sauce",
    "½ tsp five spice powder",
    "1 tbsp rice wine, preferably Shaohsing",
    "½ tbsp sesame oil",
    "1 tsp sugar",
    "6 Chinese pancakes",
    "2 spring onions, finely sliced",
    "5cm length cucumber, deseeded and sliced into matchsticks",
    "½ Little Gem lettuce, shredded",
    "4 tbsp hoisin sauce",
  ],
  time: "25mins",
  portion: "for 2",
  nutritionalValues: {
    kcal: "254",
    fat: "7g",
    saturates: "1g",
    carbs: "37g",
    sugars: "17g",
    fibre: "4g",
    protein: "7g",
    salt: "4.1g",
  },
});

const recipe7 = new Recipe({
  name: "Vegetarian fajitas",
  imgURL:
    "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2018/12/veggie-fajitas.jpg",
  shortDescription: "Looking for a quick and easy veggie family meal?",
  preparation: `To make the fajita mix, take two or three strips from each colour of pepper and finely chop them. Set aside. Heat the oil in a frying pan and fry the remaining pepper strips and the onion until soft and starting to brown at the edges. 
Cool slightly and mix in the chopped raw peppers. Add the garlic and cook for 1 min, then add the spices and stir. 
Cook for a couple of mins more until the spices become aromatic, then add half the lime juice and season. Transfer to a dish, leaving any juices behind, and keep warm.
Tip the black beans into the same pan, then add the remaining lime juice and plenty of seasoning. Stir the beans around the pan to warm them through and help them absorb any flavours of the fajita mix, then stir through the coriander.
Warm the tortillas in a microwave or in a low oven, then wrap them so they don’t dry out. Serve the tortillas with the fajita mix, beans, avocado and soured cream for everyone to help themselves.`,
  category: "breakfast",
  ingredients: [
    "400g can black beans, drained",
    "small bunch coriander, finely chopped",
    "4 large or 8-12 small flour tortillas",
    "1 avocado, sliced, or 1 small tub guacamole",
    "2 tbsp soured cream",
    "1 red and 1 yellow pepper, cut into strips",
    "1 tbsp oil",
    "1 red onion, cut into thin wedges",
    "1 garlic clove, crushed",
  ],
  time: "15mins",
  portion: "for 4",
  nutritionalValues: {
    kcal: "463",
    fat: "19g",
    saturates: "6g",
    carbs: "55g",
    sugars: "8g",
    fibre: "11g",
    protein: "12g",
    salt: "1.6g",
  },
});

const recipe8 = new Recipe({
  name: "Gnocchi with mushrooms",
  imgURL:
    "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2016/08/gnocchi-with-mushrooms.jpg",
  shortDescription: "Easy veggie supper that's on the table in just 20 minutes",
  preparation:
    "Bring a large pan of water to the boil and cook the gnocchi following pack instructions. When they float to the top of the pan, they are ready. Drain and set aside. Meanwhile, heat the oil and butter in a large lidded frying pan. Add the onion and mushrooms, cook for 1 min over a high heat, then turn down the heat to medium, put the lid on and cook for 5 mins, stirring a few times. Remove the lid and add the garlic, cook for 1-2 mins, then stir the gnocchi into the pan. Scatter over blobs of cheese and the parsley.",
  category: "dinner",
  ingredients: [
    "2 x 400g packs fresh gnocchi",
    "1 tbsp olive oil",
    "knob of butter",
    "1 large onion, roughly chopped",
    "500g small Forestière or Portobello mushrooms, sliced",
    "2 large garlic cloves, chopped",
    "150g pack creamy blue cheese (we used Danish blue)",
    "Small pack parsley, chopped",
  ],
  time: "10mins",
  portion: "for 4",
  nutritionalValues: {
    kcal: "471",
    fat: "15g",
    saturates: "8g",
    carbs: "63g",
    sugars: "8g",
    fibre: "8g",
    protein: "18g",
    salt: "2.7g",
  },
});

const recipe9 = new Recipe({
  name: "Vegan ramen",
  imgURL:
    "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2018/11/vegan-ramen.jpg",
  shortDescription:
    "Enjoy this vegan ramen for a tasty midweek meal in just 25 minutes.",
  preparation: `Crush the garlic with the back of a big knife, then put it in a saucepan with the ginger, miso, neri goma, mushrooms, stock and soy. Bring to a gentle simmer, cover and bubble for 5 mins until the ginger is soft. Strain into a clean pan and discard everything left in the strainer.
Meanwhile, cook the tofu. Toss it in the cornflour and heat the oil in a frying pan. Fry for a few mins on each side, being careful as you turn it that it doesn’t fall apart. Cook the noodles for 1 min less than pack instructions, so they retain a little bite. Drain and leave in the pan with a little cooking water so they don’t stick together. 
Add the pak choi and whites of the spring onions to the broth and gently reheat for 1-2 mins until the greens have just wilted.
Divide the noodles between two deep bowls, ladle over the broth and veg. Top with the tofu, beansprouts, carrot and ginger matchsticks, green parts of the spring onions and a drizzle of sesame oil, plus the other toppings, if you like. `,
  category: "dinner",
  ingredients: [
    "2 garlic cloves",
    "Thumb-sized piece ginger, sliced, plus a few slices cut into fine matchsticks to serve (optional)",
    "1½ tbsp white miso paste",
    "1 tbsp neri goma (white sesame paste) or tahini",
    "15g dried shiitake mushrooms",
    "1l good-quality vegan stock",
    "2 tbsp soy sauce",
    "200g firm tofu, cut into chunky cubes",
    "1 tbsp cornflour",
    "1 tbsp veg or sunflower oil",
  ],
  time: "25mins",
  portion: "for 2",
  nutritionalValues: {
    kcal: "556",
    fat: "19g",
    saturates: "3g",
    carbs: "69g",
    sugars: "9g",
    fibre: "9g",
    protein: "22g",
    salt: "3.92g",
  },
});

const recipe10 = new Recipe({
  name: "Avocado & black bean eggs",
  imgURL:
    "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2018/10/avocado_blackbean_eggs.jpg",
  shortDescription:
    "Start the day with this healthy breakfast with eggs, avocado and black beans.",
  preparation: `Heat the oil in a large non-stick frying pan. Add the chilli and garlic and cook until softened and starting to colour. Break in the eggs on either side of the pan. Once they start to set, spoon the beans (with their juice) and the tomatoes around the pan and sprinkle over the cumin seeds. You’re aiming to warm the beans and tomatoes rather than cook them. 
  Remove the pan from the heat and scatter over the avocado and coriander. Squeeze over half of the lime wedges. Serve with the remaining wedges on the side for squeezing over.`,
  category: "breakfast",
  ingredients: [
    "2 tsp rapeseed oil",
    "1 red chilli, deseeded and thinly sliced",
    "1 large garlic clove, sliced",
    "2 large eggs",
    "400g can black beans",
    "½ x 400g can cherry tomatoes",
    "¼ tsp cumin seeds",
    "1 small avocado, halved and sliced",
    "Handful fresh, chopped coriander",
    "1 lime, cut into wedges",
  ],
  time: "10mins",
  portion: "for 2",
  nutritionalValues: {
    kcal: "356",
    fat: "20g",
    saturates: "4g",
    carbs: "18g",
    sugars: "5g",
    fibre: "11g",
    protein: "20g",
    salt: "0.8g",
  },
});

const recipe11 = new Recipe({
  name: "Curried mango & chickpea pot",
  imgURL:
    "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2019/03/curried-mango-chickpea-pot.jpg",
  shortDescription:
    "Spiced mango, spinach and chickpea salad as a speedy packed lunch.",
  preparation: `Combine the chickpeas, yogurt, lemon and korma paste in a bowl, then toss with the carrot, cabbage, spinach and mango. Tip into your lunchbox or an airtight container and scatter with the nigella seeds and red chilli. `,
  category: "lunch",
  ingredients: [
    "200g chickpeas, drained and rinsed",
    "2 tbsp fat-free Greek yogurt",
    "½ lemon, juiced",
    "1 heaped tbsp korma curry paste",
    "½ carrot, julienned or grated",
    "70g red cabbage, shredded",
    "50g baby spinach, shredded",
    "40g mango, finely diced",
    "½ tsp nigella seeds",
    "½ small red chilli, finely sliced (deseeded if you want less heat)",
  ],
  time: "10mins",
  portion: "for 2",
  nutritionalValues: {
    kcal: "327",
    fat: "9g",
    saturates: "1g",
    carbs: "38g",
    sugars: "18g",
    fibre: "13g",
    protein: "17g",
    salt: "1g",
  },
});

const recipe12 = new Recipe({
  name: "Refried bean quesadillas",
  imgURL:
    "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--365499_11.jpg",
  shortDescription:
    "This meat-free breakfast is a cheerful way to fill up your friends.",
  preparation: `Heat the oil in a large frying pan and cook the onion and garlic for 2 mins. Add the cumin and cook for 1 min more. Tip in the beans, paprika and a splash of water. Using a potato masher, break the beans down as they warm through to make a rough purée. Season generously.
    Spread the refried beans onto 4 of the tortillas and scatter over the cheese and coriander. Spoon over the salsa, then top with the remaining tortillas to make 4 sandwiches. Wipe the frying pan with kitchen paper and return to the heat or heat a griddle pan. Cook each sandwich for 1-2 mins on each side until the tortillas are crisp and golden and the cheese is melting. Serve warm, cut into wedges, with extra salsa and soured cream for dipping.`,
  category: "breakfast",
  ingredients: [
    "1 tbsp sunflower oil",
    "1 onion, finely chopped",
    "2 garlic cloves, finely chopped",
    "1 tsp cumin seeds",
    "400g can pinto or kidney beans, rinsed and drained",
    "2 tsp smoked paprika",
    "8 flour tortillas",
    "100g cheddar or gruyère, coarsely grated",
    "handful coriander leaves",
    "soured cream, to serve",
    "200g tub fresh tomato salsa, plus extra to serve",
  ],
  time: "40mins",
  portion: "for 4",
  nutritionalValues: {
    kcal: "487",
    fat: "18g",
    saturates: "7g",
    carbs: "65g",
    sugars: "9g",
    fibre: "7g",
    protein: "20g",
    salt: "3.74g",
  },
});

// const defaultRecipes = [recipe1, recipe2, recipe3, recipe4, recipe5, recipe6];
const defaultRecipes = [
  recipe1,
  recipe2,
  recipe3,
  recipe4,
  recipe5,
  recipe6,
  recipe7,
  recipe8,
  recipe9,
  recipe10,
  recipe11,
  recipe12,
];

Recipe.find({}, function (err, foundItems) {
  if (foundItems.length === 0) {
    Recipe.insertMany(defaultRecipes, function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully saved all the recipes to DB");
      }
    });
  } 
});

// Heroku port set up
let port = process.env.PORT;
if (port==null || port == ""){
  port=8081;
}
app.listen(port, function(){
  console.log("Server started successfully")
});

//Launch listening server on port 8080
// app.listen(8081, "0.0.0.0");
// console.log("App is running on http://8081:0.0.0.0");
