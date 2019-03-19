let express = require("express");
let bodyParser = require("body-parser");

let app = express();

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/html/index.html");
});

app.post("/test", function(request, response) {
  console.log(request.body);
  response.send(request.body);
  console.log(request.body.cmd);
  switch (request.body.cmd) {
    case "UP":
      console.log("Accèlération");
      break;
    case "DOWN":
      console.log("Ralentissement");
      break;
    case "ONOFF":
      console.log("Commande ON / OFF");
      break;
    case "REVERSE":
      console.log("Changement de sens");
      break;
    default:
      console.log("Commande non supportée");
  }
});

app.use("/javascript", express.static(__dirname + "/javascript"));
app.use("/css", express.static(__dirname + "/css"));

console.log("Lancement du serveur : http://localhost:3000/");

app.listen(3000);
