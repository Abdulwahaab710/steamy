//the express framework will be used to manage HTTP requests to our server side code.
//express allows us to write a scalable API. Used by a large majority of node projects.
var express = require('express');
var mysql = require('mysql');

//body-parser will enable us to access information in incoming request bodies.
var bodyParser = require('body-parser');

console.log("\nInitializing application...\n");
//register our app as an express application
var app = express();
//set the root directory of the project, required for res.sendFile.
app.use('/', express.static(__dirname + '/'));

//enable our application to use the body parsing library imported above.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({limit: "5mb", extended: true, parameterLimit:5000}));

//load the database module, and allow for connections to be made from the server side code.
var databaseModule = require('./database/database.js');
var database = new databaseModule(mysql);
database.acquireConnection();

//load and initialize our endpoints module for the API
var endspointsAPIMoule = require('./endpointsAPI.js');
var endspointsAPI = new endspointsAPIMoule(app, database, __dirname);
endspointsAPI.activateEndpoints();

console.log("\nInitilization complete.\n");

//our app is now fully initialized, listen on port 3000 and await a request from the client.
app.listen(3001, function() {
  console.log("Now listening on 3001.");
});
