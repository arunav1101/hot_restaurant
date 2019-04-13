// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
const port = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var reservation = [
  {
    id: "1",
    name: "Hoang",
    phone: 988,
    email: "1@1.com"
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/add", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});


app.get("/api/reservation", function(req, res) {
  return res.json(reservation);
});

// Displays a single reservation, or returns false
app.get("/api/reservation/:reservation", function(req, res) {
  var chosen = req.params.reservation;

  console.log(chosen);

  for (var i = 0; i < reservation.length; i++) {
    if (chosen === reservation[i].name) {
      return res.json(reservation[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/reservation", function(req, res) {

  var newreservation = req.body;
  newreservation.routeName = newreservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newreservation);

  reservation.push(newreservation);

  res.json(reservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
