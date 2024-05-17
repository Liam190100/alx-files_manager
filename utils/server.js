// Import required modules
const express = require('express');
const bodyParser = require('body-parser');

// Import the routes
const routes = require('./routes/index');

// Express app
const app = express();

// Parse JSON requests
app.use(bodyParser.json());

// Routes/index.js
app.use('/', routes);

// port to listen on
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
