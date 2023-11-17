// Import necessary modules
import axios from "axios";
import express from "express";

// Create an instance of the Express application
const app = express();
const port = 3000;

// Set up the view engine (assuming you're using EJS)
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Define a route for the root endpoint ('/')
app.get('/',  (req, res) => {
 res.render("index",{jokes:""});
});

app.get('/getjokes', async (req, res) => {
  try {
    // Fetch a joke from the joke API
    const response = await axios.get('https://v2.jokeapi.dev/joke/Programming');

    // Render the index view with the fetched joke
    res.render("index", { jokes: response.data.joke });
  } catch (error) {
    console.error(error);

    // Render the index view with an error message
    res.render("index", { error: 'Failed to fetch a joke' });
  }
});


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
