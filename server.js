// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 5001;

const server = app.listen(port, () => {
    console.log(`Server is running on localhost: ${port}`)
})

// get 
// GET route that returns the projectData object in the server code

const myprojectData = {} ;

app.get('/getEntry', function (req, res) {
    res.send(myprojectData);
  });


// post 
// POST route that adds incoming data to projectData

app.post('/addEntry', function addThing (req, res)  {

  myprojectData.temperature = req.body.temperature ;
  myprojectData.date = req.body.date ;
  myprojectData.userResponse = req.body.userResponse ;

  res.send(myprojectData)
  console.log(myprojectData)
})