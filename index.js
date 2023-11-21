// Import necessary modules
import axios from "axios";
import express from "express";

// Create an instance of the Express application
const app = express();
const port = 3000;

// Set up the view engine (assuming you're using EJS)
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // Middleware for parsing URL-encoded requests

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route for the root endpoint ('/')


app.get('/', async (req, res) => {
  try {
    // Fetch a joke from the joke API
    const response = await axios.get('https://v2.jokeapi.dev/joke/Any?type=single&amount=10');
    // Render the index view with the fetched joke
    res.render("index", { jokes: response.data.jokes,selectedCategory:"Any" });
  } catch (error) {
    console.error(error);

    // Render the index view with an error message
    res.render("index", { error: 'Failed to fetch a joke' });
  }
});
app.post("/", async (req, res) => {
  try {
    var category = req.body.category;
    const category2 =category;

if (category[0]==="A"){
  res.redirect("/");
}
category.shift();
const response = await axios.get(`https://v2.jokeapi.dev/joke/${category.join()}?type=single&amount=10`);

    // Render the index view with the fetched jokes and the selected category
    category2.push("Custom");
    res.render("index", { jokes: response.data.jokes, selectedCategory:  category2 });
  } catch (error) {
    console.error(error);

    // Render the index view with an error message
    res.render("index", { error: 'Failed to fetch jokes', selectedCategory: req.body.category });
  }
});


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
