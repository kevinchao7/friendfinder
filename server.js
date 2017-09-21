// Dependencies
// =============================================================
var express        = require("express");
var bodyParser     = require("body-parser");
var path           = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var port = process.env.PORT || 3000;
var friends = [{
  "name":"Ahmed",
  "photo":"http://www.networthupdates.org/wp-content/uploads/2017/04/FouseyTube.jpg",
  "scores":[
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1
  ]
}];

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.post("/api/friends", function(req, res) {
  var newUser = req.body;

  var match;
  var minScore;
  friends.forEach((value,index)=>{
    var total = 0;
    value.scores.forEach((val,ind)=>{
      total += Math.abs(val - newUser.scores[ind]);
    });
    if (match == undefined){
      minScore = total;
      match    = index;
    }
    else if (total < minScore){
      minScore = total;
      match    = index;
    }
  });



  friends.push(newUser);
  console.log(newUser);
  res.json(friends[match]);
});

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/home.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "public/survey.html"));
});



// Starts the server to begin listening
// =============================================================
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});
