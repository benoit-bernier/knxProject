const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const knx = require("knx");
const so = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = so.listen(httpServer);

let connection = "";
let connected = false;
let state = 0; // state for the chenillard
let speed = 500; // default time between two commands
let speed_ratio = 100; // real speed = speed + speed_ratio (allow to increase or decrease the speed of the chenillard)
let schema = [0, 1, 2, 3]; // schéma allumage des LED par défaut
let mchenillard = ""; //instance du chenillard

function init() {
  state = 0;
  speed = 500;
  speed_ratio = 100;
  schema = [0, 1, 2, 3];
  mchenillard = "";
}

function chenillard(state) {
  connection.write("0/1/" + (schema[(state + 1) % 4] + 1), 1);
  connection.write("0/1/" + (schema[state % 4] + 1), 0);
  console.log("Vitesse actuelle : " + speed_ratio);
}

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/html/index.html");
});

connection = new knx.Connection({
  // ip address and port of the KNX router or interface
  ipAddr: "192.168.0.5",
  port: 3671,
  minimumDelay: 50,
  handlers: {
    // wait for connection establishment before sending anything!
    connected: function() {
      // partie connexion
      console.log("Connected !");
      // fin partie connexion
    },
    // get notified for all KNX events:
    event: function(evt, src, dest, value) {
      switch (dest) {
        case "0/3/1":
          if (speed_ratio === 0) {
            console.log("Impossible d'accélérer.");
          } else {
            //Accelere
            clearInterval(mchenillard);
            mchenillard = setInterval(function() {
              chenillard(state);
              state = (state + 1) % 4;
            }, speed + speed_ratio);
            speed_ratio -= 1;
            console.log("La vitesse est de :" + speed_ratio);
          }
          break;
        case "0/3/2":
          if (speed_ratio > 5000) {
            console.log("Impossible de ralentir.");
          } else {
            //Ralenti
            speed_ratio += 1;
            clearInterval(mchenillard);
            mchenillard = setInterval(function() {
              chenillard(state);
              state = (state + 1) % 4;
            }, speed + speed_ratio);
            console.log("La vitesse est de :" + speed_ratio);
          }
          //Ralenti
          break;
        case "0/3/3":
          if (mchenillard == "") {
            mchenillard = setInterval(function() {
              chenillard(state);
              state = (state + 1) % 4;
              console.log("Lancement du chenillard");
            }, speed + speed_ratio);
          } else {
            console.log("Stop du chenillard");
            clearInterval(mchenillard);
            mchenillard = "";
          }
          break;
        case "0/3/4":
          console.log("Changement de sens du chenillard");
          schema.reverse();
          console.log(schema);
          clearInterval(mchenillard);
          mchenillard = setInterval(function() {
            chenillard(state);
            state = (state + 1) % 4;
          }, speed + speed_ratio);
          break;

        default:
      }
      /*
      console.log(
        "event: %s, src: %j, dest: %j, value: %j",
        evt,
        src,
        dest,
        value
      );
      */
    },
    // get notified on connection errors
    error: function(connstatus) {
      console.log("**** ERROR: %j", connstatus);
    }
  }
});

io.on("connection", function(socket) {
  socket.on("events", function(data) {
    console.log(data);
    let input = JSON.parse(data);
    switch (input.cmd) {
      case "CONNECT":
        if (!connected) {
          connection = new knx.Connection({
            // ip address and port of the KNX router or interface
            ipAddr: "192.168.0.5",
            port: 3671,
            minimumDelay: 50,
            handlers: {
              // wait for connection establishment before sending anything!
              connection: function() {
                // partie connexion
                console.log("connection !");
                connected = true;
                // fin partie connexion
              },
              // get notified for all KNX events:
              event: function(evt, src, dest, value) {
                switch (dest) {
                  case "0/3/1":
                    if (speed_ratio === 0) {
                      console.log("Impossible d'accélérer.");
                    } else {
                      //Accelere
                      clearInterval(mchenillard);
                      mchenillard = setInterval(function() {
                        chenillard(state);
                        state = (state + 1) % 4;
                      }, speed + speed_ratio);
                      speed_ratio -= 1;
                      console.log("La vitesse est de :" + speed_ratio);
                    }
                    break;
                  case "0/3/2":
                    if (speed_ratio > 5000) {
                      console.log("Impossible de ralentir.");
                    } else {
                      //Ralenti
                      speed_ratio += 1;
                      clearInterval(mchenillard);
                      mchenillard = setInterval(function() {
                        chenillard(state);
                        state = (state + 1) % 4;
                      }, speed + speed_ratio);
                      console.log("La vitesse est de :" + speed_ratio);
                    }
                    //Ralenti
                    break;
                  case "0/3/3":
                    if (mchenillard == "") {
                      mchenillard = setInterval(function() {
                        chenillard(state);
                        state = (state + 1) % 4;
                        console.log("Lancement du chenillard");
                      }, speed + speed_ratio);
                    } else {
                      console.log("Stop du chenillard");
                      clearInterval(mchenillard);
                      mchenillard = "";
                    }
                    break;
                  case "0/3/4":
                    console.log("Changement de sens du chenillard");
                    schema.reverse();
                    clearInterval(mchenillard);
                    mchenillard = setInterval(function() {
                      chenillard(state);
                      state = (state + 1) % 4;
                    }, speed + speed_ratio);
                    break;

                  default:
                }
                /*
            console.log(
              "event: %s, src: %j, dest: %j, value: %j",
              evt,
              src,
              dest,
              value
            );
            */
              },
              // get notified on connection errors
              error: function(connstatus) {
                console.log("**** ERROR: %j", connstatus);
              }
            }
          });
        } else {
          console.log("Serveur déjà connecté à la maquette");
        }
        break;
      case "DISCONNECT":
        connection.Disconnect();
        connected = false;
        break;
      case "UP":
        console.log("Accélération");
        if (connected) {
          if (speed_ratio < 1) {
            console.log("Impossible d'accélérer.");
          } else {
            //Accelere
            clearInterval(mchenillard);
            mchenillard = setInterval(function() {
              chenillard(state);
              state = (state + 1) % 4;
            }, speed + speed_ratio);
            speed_ratio -= 1;
            console.log("La vitesse est de :" + speed_ratio);
          }
        } else {
          console.log("Non connecté à la maquette");
        }
        break;
      case "DOWN":
        console.log("Ralentissement");
        if (connected) {
          if (speed_ratio > 5) {
            console.log("Impossible de ralentir.");
          } else {
            //Ralenti
            speed_ratio += 1;
            clearInterval(mchenillard);
            mchenillard = setInterval(function() {
              chenillard(state);
              state = (state + 1) % 4;
            }, speed + speed_ratio);
            console.log("La vitesse est de :" + speed_ratio);
          }
        } else {
          console.log("Non connecté à la maquette");
        }
        break;
      case "ONOFF":
        console.log("Commande ON / OFF");
        if (connected) {
          if (mchenillard == "") {
            mchenillard = setInterval(function() {
              chenillard(state);
              state = (state + 1) % 4;
              console.log("Lancement du chenillard");
            }, speed + speed_ratio);
          } else {
            console.log("Stop du chenillard");
            clearInterval(mchenillard);
            mchenillard = "";
          }
        } else {
          console.log("Non connecté à la maquette");
        }
        break;
      case "REVERSE":
        console.log("Changement de sens du chenillard");
        if (connected) {
          schema.reverse();
          console.log(schema);
          clearInterval(mchenillard);
          mchenillard = setInterval(function() {
            chenillard(state);
            state = (state + 1) % 4;
          }, speed + speed_ratio);
        } else {
          console.log("Non connecté à la maquette");
        }
        break;
      case "SCHEMA":
        console.log("Changement du shéma du chenillard :" + input.data);
        if (connected) {
          schema = input.data;
          clearInterval(mchenillard);
          mchenillard = setInterval(function() {
            chenillard(state);
            state = (state + 1) % 4;
          }, speed + speed_ratio);
        } else {
          console.log("Non connecté à la maquette");
        }
        break;
      case "RESET":
        console.log("Reset des paramètres par défaut de la maquette");
        if (connected) {
          init();
        } else {
          console.log("Non connecté à la maquette");
        }
        break;
      default:
        console.log("Commande non supportée");
    }
  });
});

app.use("/javascript", express.static(__dirname + "/javascript"));
app.use("/css", express.static(__dirname + "/css"));
app.use(
  "/socketio",
  express.static(__dirname + "/node_modules/socket.io-client/dist")
);

console.log("Lancement du serveur : http://localhost:3000/");

httpServer.listen(3000);
