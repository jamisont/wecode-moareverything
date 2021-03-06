var express = require("express"); // imports express
var app = express();        // create a new instance of express

// imports the fs module (reading and writing to a text file)
var fs = require("fs");

// the bodyParser middleware allows us to parse the
// body of a request
// app.use(express.bodyParser());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// The global datastore for this example
var listings;

// Asynchronously read file contents, then call callbackFn
function readFile(filename, defaultData, callbackFn) {
  fs.readFile(filename, function(err, data) {
    if (err) {
      console.log("Error reading file: ", filename);
      data = defaultData;
    } else {
      console.log("Success reading file: ", filename);
    }
    if (callbackFn) callbackFn(err, data);
  });
}

// Asynchronously write file contents, then call callbackFn
function writeFile(filename, data, callbackFn) {
  fs.writeFile(filename, data, function(err) {
    if (err) {
      console.log("Error writing file: ", filename);
    } else {
      console.log("Success writing file: ", filename);
    }
    if (callbackFn) callbackFn(err);
  });
}

// get all items
app.get("/listings", function(request, response){
  response.send({
    listings: listings,
    success: true
  });
});

// get one random item
app.get("/listings/random", function(request, response){
  var id = Math.floor(Math.random() * listings.length)
  var item = listings[id];
  response.send({
    listings: [item],
    success: (item !== undefined)
  });
});

// get one item
app.get("/listings/:id", function(request, response){
  var id = request.params.id;
  var item = listings[id];
  response.send({
    listings: [item],
    success: (item !== undefined)
  });
});

// create new item
app.post("/listings", function(request, response) {
  console.log(request.body);
  var item = {"name": request.body.name,
              "file": request.body.file,
              "desc": request.body.desc,
              "author": request.body.author,
              "date": new Date(),
             };

  var successful = 
      (item.name !== undefined) &&
      (item.file !== undefined) &&
      (item.author !== undefined);

  if (successful) {
    listings.push(item);
    writeFile("node-data.txt", JSON.stringify(listings));
  } else {
    item = undefined;
  }

  response.send({ 
    item: item,
    success: successful
  });
});

// update one item
app.put("/listings/:id", function(request, response){
  // change listing at index, to the new listing
  var id = request.params.id;
  var oldItem = listings[id];
  var item = { "name": request.body.name,
               "file": request.body.file,
               "desc": request.body.desc,
               "author": request.body.author,
               "date": new Date(),
             };
  item.name = (item.name !== undefined) ? item.name : oldItem.name;
  item.file = (item.file !== undefined) ? item.file : oldItem.file;
  item.desc = (item.desc !== undefined) ? item.desc : oldItem.desc;
  item.author = (item.author !== undefined) ? item.author : oldItem.author;

  // commit the update
  listings[id] = item;
  writeFile("node-data.txt", JSON.stringify(listings));

  response.send({
    item: item,
    success: true
  });
});

// delete entire list
app.delete("/listings", function(request, response){
  listings = [];
  writeFile("node-data.txt", JSON.stringify(listings));
  response.send({
    listings: listings,
    success: true
  });
});

// delete one item
app.delete("/listings/:id", function(request, response){
  var id = request.params.id;
  var old = listings[id];
  listings.splice(id, 1);
  writeFile("node-data.txt", JSON.stringify(listings));
  response.send({
    listings: old,
    success: (old !== undefined)
  });
});

// This is for serving files in the static directory
app.get("/static/:staticFilename", function (request, response) {
    response.sendfile("static/" + request.params.staticFilename);
});

function initServer() {
  // When we start the server, we must load the stored data
  var defaultList = "[]";
  readFile("node-data.txt", defaultList, function(err, data) {
    listings = JSON.parse(data);
  });
}

// Finally, initialize the server on any port, and go to that url
// in your browser
initServer();
app.listen(8889);
