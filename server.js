// server.js
const express  = require('express');
const path = require('path');
const proxy = require('express-http-proxy');
const cors = require('cors');

const app = express();


// Run the app by serving the static files
// in the dist directory
app.use(express.static(__dirname + '/dist'));

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
});



// Set our api routes proxy for each appropriate env
// if(process.env.PORT) {
//  app.use('/backend', proxy('https://secret-plains-11957.herokuapp.com'));
// } else {
//  //development
//  app.use('/backend', proxy('https://secret-plains-11957.herokuapp.com'));
// }


// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);
