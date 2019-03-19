let express = require("express");
let bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/html/index.html");
});

app.post("/test", function(request, response) {
  console.log(request.body); // your JSON
  response.send(request.body); // echo the result back
});

app.use("/javascript", express.static(__dirname + "/javascript"));
app.use("/css", express.static(__dirname + "/css"));

console.log("Lancement du serveur : http://localhost:3000/");

app.listen(3000);
