module.exports = function(app){
  // Create New Characters - takes in JSON input
  app.post("/api/friends", function(req, res) {
    var newUser = req.body;

    friends.push(newUser);

    console.log(newUser);

    res.json(newUser);
  });
}
