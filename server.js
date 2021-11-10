// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 3000;

app.listen(port, () => {
  console.log('server running');
  console.log(`running on localhost: ${port}`);
});

app.get('/projectData', (req, res) => {
  // send projectData
  res.send(projectData);
});

app.post('/projectData', (req, res) => {
  /**
   * a POST route that adds incoming data to projectData.
   * The POST route should anticipate receiving three pieces of data
   * from the request body
   * temperature
   * date
   * user response
   */

  projectData['temperature'] = req.body.temperature;
  projectData['date'] = req.body.date;
  projectData['userResponse'] = req.body.userResponse;
  console.log(projectData);
});
