import express, { json } from "express";
import axios from "axios";

const port = 3000;
const app = express();
const API_URL = "https://www.thecocktaildb.com/api/json/v1/1/random.php";
const ingredients = [15];
app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.use(express.static("public"));

app.get("/submit", async (req, res) => {
  try {
    const result = await axios.get(API_URL);
    const drink = result.data.drinks[0];

    for (let i = 1; i <= 15; i++) {
      const ingredient = drink[`strIngredient${i}`];
      if (ingredient) {
        ingredients.push(ingredient);
      }
    }

    res.render("index.ejs", {
      coctailName: drink.strDrink,
      coctailImage: drink.strDrinkThumb,
      ingredients: ingredients,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
