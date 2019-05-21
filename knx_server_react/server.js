const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const knx = require("knx");
const so = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = so.listen(httpServer);
const port_server = 5000;

let ip_maquette = "192.168.1.5";
let port_maquette = 3671;

let connected = false; //connecté à la maquette
let connection = ""; //contient la socket de connexion KNX
let mchenillard = ""; //instance du chenillard
let state = 0; // state for the chenillard
let speed = 500; // default time between two commands
let schema = [0, 1, 2, 3]; // schéma allumage des LED par défaut
let mode = ""; //mode de la maquette
let reference = ""; //reférence / modèle du jeu

init();

function init() {
  state = 0;
  speed = 500;
  schema = [0, 1, 2, 3];
  mode = "";
  reference = "";
  clearInterval(mchenillard);
  mchenillard = "";
  connection = new knx.Connection({
    // ip address and port of the KNX router or interface
    ipAddr: ip_maquette,
    port: port_maquette,
    minimumDelay: 50,
    handlers: {
      // wait for connection establishment before sending anything!
      connected: function() {
        // partie connexion
        console.log("Connected !");
        connected = true;

        myObj = {
          cmd: "state_connection",
          data: connected
        };
        myJSON = JSON.stringify(myObj);
        io.sockets.emit("state", myJSON);

        // fin partie connexion
      },
      // get notified for all KNX events:
      event: function(evt, src, dest, value) {
        switch (dest) {
          case "0/3/1":
            mode = "";
            if (speed < 500) {
              console.log("Impossible d'accélérer.");
            } else {
              //Accelere
              clearInterval(mchenillard);
              downLED();
              mchenillard = setInterval(function() {
                chenillard(state);
                state = (state + 1) % 4;
              }, speed);
              speed -= 100;
              console.log("La vitesse est de :" + speed);
            }
            break;
          case "0/3/2":
            mode = "";
            if (speed > 5000) {
              console.log("Impossible de ralentir.");
            } else {
              //Ralenti
              speed += 100;
              clearInterval(mchenillard);
              downLED();
              mchenillard = setInterval(function() {
                chenillard(state);
                state = (state + 1) % 4;
              }, speed);
              console.log("La vitesse est de :" + speed);
            }
            //Ralenti
            break;
          case "0/3/3":
            mode = "";
            if (mchenillard == "") {
              mchenillard = setInterval(function() {
                chenillard(state);
                state = (state + 1) % 4;
                console.log("Lancement du chenillard");
              }, speed);
            } else {
              console.log("Stop du chenillard");
              clearInterval(mchenillard);
              downLED();
              mchenillard = "";
            }
            break;
          case "0/3/4":
            mode = "";
            console.log("Changement de sens du chenillard");
            schema.reverse();
            console.log(schema);
            clearInterval(mchenillard);
            downLED();
            mchenillard = setInterval(function() {
              chenillard(state);
              state = (state + 1) % 4;
            }, speed);
            break;
          case "0/2/1":
            mValue = new String(value);
            input = new String("\u0000");
            if (mValue.toString() == input.toString()) {
              mBool = 0;
            } else {
              mBool = 1;
            }
            myObj = {
              cmd: "state_led_1",
              data: mBool
            };
            myJSON = JSON.stringify(myObj);
            io.sockets.emit("state_led", myJSON);
            break;
          case "0/2/2":
            mValue = new String(value);
            input = new String("\u0000");
            if (mValue.toString() == input.toString()) {
              mBool = 0;
            } else {
              mBool = 1;
            }
            myObj = {
              cmd: "state_led_2",
              data: mBool
            };
            myJSON = JSON.stringify(myObj);
            io.sockets.emit("state_led", myJSON);
            break;
          case "0/2/3":
            mValue = new String(value);
            input = new String("\u0000");
            if (mValue.toString() == input.toString()) {
              mBool = 0;
            } else {
              mBool = 1;
            }
            myObj = {
              cmd: "state_led_3",
              data: mBool
            };
            myJSON = JSON.stringify(myObj);
            io.sockets.emit("state_led", myJSON);
            break;
          case "0/2/4":
            mValue = new String(value);
            input = new String("\u0000");
            if (mValue.toString() == input.toString()) {
              mBool = 0;
            } else {
              mBool = 1;
            }
            myObj = {
              cmd: "state_led_4",
              data: mBool
            };
            myJSON = JSON.stringify(myObj);
            io.sockets.emit("state_led", myJSON);
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
}

function downLED() {
  connection.write("0/1/1", 0);
  connection.write("0/1/2", 0);
  connection.write("0/1/3", 0);
  connection.write("0/1/4", 0);
}

function chenillard(state) {
  connection.write("0/1/" + (schema[(state + 1) % 4] + 1), 1);
  connection.write("0/1/" + (schema[state % 4] + 1), 0);
  console.log("Vitesse actuelle : " + speed);
}

function blink(position, time) {
  if (time < 500) {
    console.log("Erreur lors du blink : temps minimal non respecté.");
    return;
  }

  console.log("Blink ON LED " + position + " : " + time + "ms");
  connection.write("0/1/" + position, 1);
  setTimeout(function() {
    console.log("Blink OFF LED " + position);
    connection.write("0/1/" + position, 0);
  }, time);
}

function shuffle_tab(tab, iteration) {
  for (i = 0; i < iteration; i++) {
    j = Math.floor(Math.random() * tab.length);
    k = Math.floor(Math.random() * tab.length);
    tmp = tab[j];
    tab[j] = tab[k];
    tab[k] = tmp;
  }
  return tab;
}

function verify_order(tab, reference) {
  return new Promise(function(resolve, reject) {
    let result = [0, 0, 0, 0];
    for (i in tab) {
      if (tab[i] == reference[i]) {
        result[i] = 1;
      }
    }
    resolve(result);
  });
}

function show_simon(tab) {
  connection.write("0/1/1", 0);
  connection.write("0/1/2", 0);
  connection.write("0/1/3", 0);
  connection.write("0/1/4", 0);
  tab.forEach(element => {
    connection.write("0/1/" + element, 1);
    setTimeout(function() {
      connection.write("0/1/" + element, 0);
    }, 500);
  });
}

function send_message_client(socket, cmd, data, canal) {
  myObj = {
    cmd: cmd,
    data: data
  };
  myJSON = JSON.stringify(myObj);
  socket.emit(canal, myJSON);
}

app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/html/index.html");
});

io.on("connection", function(socket) {
  ///////////////////////////////////////////////////////////////////////

  myObj = {
    cmd: "state_server",
    data: true
  };
  myJSON = JSON.stringify(myObj);
  io.sockets.emit("state", myJSON);

  myObj = {
    cmd: "state_connection",
    data: connected
  };
  myJSON = JSON.stringify(myObj);
  io.sockets.emit("state", myJSON);

  myObj = {
    cmd: "state_ip_maquette",
    data: ip_maquette
  };
  myJSON = JSON.stringify(myObj);
  io.sockets.emit("state", myJSON);

  myObj = {
    cmd: "state_port_maquette",
    data: port_maquette
  };
  myJSON = JSON.stringify(myObj);
  io.sockets.emit("state", myJSON);

  ///////////////////////////////////////////////////////////////////////
  /*
  setInterval(function() {
    myObj = {
      cmd: "state_led_1",
      data: 0
    };
    myJSON = JSON.stringify(myObj);
    io.sockets.emit("state_led", myJSON);
    console.log("LED 1 OFF");
  }, 7000);

  setInterval(function() {
    myObj = {
      cmd: "state_led_1",
      data: 1
    };
    myJSON = JSON.stringify(myObj);
    io.sockets.emit("state_led", myJSON);
    console.log("LED 1 ON");
  }, 10000);

  setInterval(function() {
    myObj = {
      cmd: "state_led_2",
      data: 0
    };
    myJSON = JSON.stringify(myObj);
    io.sockets.emit("state_led", myJSON);
  }, 12000);

  setInterval(function() {
    myObj = {
      cmd: "state_led_2",
      data: 1
    };
    myJSON = JSON.stringify(myObj);
    io.sockets.emit("state_led", myJSON);
  }, 7000);

  setInterval(function() {
    myObj = {
      cmd: "state_led_3",
      data: 0
    };
    myJSON = JSON.stringify(myObj);
    io.sockets.emit("state_led", myJSON);
  }, 5000);

  setInterval(function() {
    myObj = {
      cmd: "state_led_3",
      data: 1
    };
    myJSON = JSON.stringify(myObj);
    io.sockets.emit("state_led", myJSON);
  }, 4000);

  setInterval(function() {
    myObj = {
      cmd: "state_led_4",
      data: 0
    };
    myJSON = JSON.stringify(myObj);
    io.sockets.emit("state_led", myJSON);
  }, 10000);

  setInterval(function() {
    myObj = {
      cmd: "state_led_4",
      data: 1
    };
    myJSON = JSON.stringify(myObj);
    io.sockets.emit("state_led", myJSON);
  }, 7000);

  ///////////////////////////////////////////////////////////////////////
*/
  socket.on("sayHello", function(data) {
    try {
      input = JSON.parse(data);
      console.log(input);
      socket.emit("sayHello", input);
    } catch (e) {
      input = data["cmd"];
      console.log(input);
      socket.emit("sayHello", data);
    }
  });
  socket.on("events", function(data) {
    console.log("========EVENT============");
    try {
      input = JSON.parse(data);
    } catch (e) {
      minput = data["data"];
      input = JSON.parse(minput);
    }
    try {
      switch (input.cmd) {
        case "CONNECT":
          if (!connected) {
            init();
            send_message_client(
              socket,
              "default_message",
              "Recherche de la maquette sur le réseau...",
              "default_mode"
            );
          } else {
            send_message_client(
              socket,
              "default_message",
              "Serveur déjà connecté à la maquette",
              "default_mode"
            );
            console.log("Serveur déjà connecté à la maquette");
          }
          break;
        case "DISCONNECT":
          if (connected) {
            connection.Disconnect();
            clearInterval(mchenillard);
            downLED(connection);
            mchenillard = "";
            connection = "";
            connected = false;
            console.log("Serveur et maquette déconnecté");
            send_message_client(
              socket,
              "default_message",
              "Serveur et maquette déconnecté",
              "default_mode"
            );
          } else {
            send_message_client(
              socket,
              "default_message",
              "Pas de maquette appareillée.",
              "default_mode"
            );
            console.log("Pas de maquette appareillée.");
          }
          break;
        case "UP":
          console.log("Accélération");
          if (connected && mode == "") {
            if (speed == 0) {
              send_message_client(
                socket,
                "default_message",
                "Impossible d'accélérer.",
                "default_mode"
              );
            } else {
              //Accelere
              clearInterval(mchenillard);
              downLED();
              mchenillard = setInterval(function() {
                chenillard(state);
                state = (state + 1) % 4;
              }, speed);
              speed -= 100;
              send_message_client(
                socket,
                "default_message",
                "La vitesse est de : " + speed,
                "default_mode"
              );
              console.log("La vitesse est de : " + speed);
            }
          } else {
            if (!connected) {
              console.log("Non connecté à la maquette");
              send_message_client(
                socket,
                "default_message",
                "Non connecté à la maquette",
                "default_mode"
              );
            } else {
              console.log("Maquette en mode jeu : " + mode);
              send_message_client(
                socket,
                "default_message",
                "Maquette en mode jeu : " + mode,
                "default_mode"
              );
            }
          }
          break;
        case "DOWN":
          console.log("Ralentissement");
          if (connected && mode == "") {
            if (speed > 5000) {
              console.log("Impossible de ralentir.");
              send_message_client(
                socket,
                "default_message",
                "Impossible de ralentir.",
                "default_mode"
              );
            } else {
              //Ralenti
              speed += 100;
              clearInterval(mchenillard);
              downLED();
              mchenillard = setInterval(function() {
                chenillard(state);
                state = (state + 1) % 4;
              }, speed);
              console.log("La vitesse est de : " + speed);
              send_message_client(
                socket,
                "default_message",
                "La vitesse est de : " + speed,
                "default_mode"
              );
            }
          } else {
            if (!connected) {
              console.log("Non connecté à la maquette");
              send_message_client(
                socket,
                "default_message",
                "Non connecté à la maquette",
                "default_mode"
              );
            } else {
              console.log("Maquette en mode jeu : " + mode);
              send_message_client(
                socket,
                "default_message",
                "Maquette en mode jeu : " + mode,
                "default_mode"
              );
            }
          }
          break;
        case "SETSPEED":
          console.log("Set speed : " + input.data);
          let speed_value = parseInt(input.data, 10);
          if (connected && mode == "") {
            if (speed_value > 5000 || speed_value <= 500) {
              console.log("Impossible de set la speed : " + input.data);
              send_message_client(
                socket,
                "default_message",
                "Impossible de ralentir.",
                "default_mode"
              );
            } else {
              //Ralenti
              speed = speed_value;
              clearInterval(mchenillard);
              downLED();
              mchenillard = setInterval(function() {
                chenillard(state);
                state = (state + 1) % 4;
              }, speed);
              console.log("La vitesse est de : " + speed_value);
              send_message_client(
                socket,
                "default_message",
                "La vitesse est de : " + speed_value,
                "default_mode"
              );
            }
          } else {
            if (!connected) {
              console.log("Non connecté à la maquette");
              send_message_client(
                socket,
                "default_message",
                "Non connecté à la maquette",
                "default_mode"
              );
            } else {
              console.log("Maquette en mode jeu : " + mode);
              send_message_client(
                socket,
                "default_message",
                "Maquette en mode jeu : " + mode,
                "default_mode"
              );
            }
          }
          break;
        case "ONOFF":
          console.log("Commande ON / OFF");
          if (connected && mode == "") {
            if (mchenillard == "") {
              mchenillard = setInterval(function() {
                chenillard(state);
                state = (state + 1) % 4;
                console.log("Lancement du chenillard");
                send_message_client(
                  socket,
                  "default_message",
                  "Lancement du chenillard",
                  "default_mode"
                );
              }, speed);
            } else {
              console.log("Stop du chenillard");
              send_message_client(
                socket,
                "default_message",
                "Stop du chenillard",
                "default_mode"
              );
              clearInterval(mchenillard);
              downLED();
              mchenillard = "";
            }
          } else {
            if (!connected) {
              console.log("Non connecté à la maquette");
              send_message_client(
                socket,
                "default_message",
                "Non connecté à la maquette",
                "default_mode"
              );
            } else {
              console.log("Maquette en mode jeu : " + mode);
              send_message_client(
                socket,
                "default_message",
                "Maquette en mode jeu : " + mode,
                "default_mode"
              );
            }
          }
          break;
        case "REVERSE":
          console.log("Changement de sens du chenillard");
          send_message_client(
            socket,
            "default_message",
            "Changement de sens du chenillard",
            "default_mode"
          );
          if (connected && mode == "") {
            schema.reverse();
            console.log(schema);
            clearInterval(mchenillard);
            downLED();
            mchenillard = setInterval(function() {
              chenillard(state);
              state = (state + 1) % 4;
            }, speed);
          } else {
            if (!connected) {
              console.log("Non connecté à la maquette");
              send_message_client(
                socket,
                "default_message",
                "Non connecté à la maquette",
                "default_mode"
              );
            } else {
              console.log("Maquette en mode jeu : " + mode);
              send_message_client(
                socket,
                "default_message",
                "Maquette en mode jeu : " + mode,
                "default_mode"
              );
            }
          }
          break;
        case "SCHEMA":
          console.log("Changement du shéma du chenillard :" + input.data);
          send_message_client(
            socket,
            "default_message",
            "Changement du shéma du chenillard :" + input.data,
            "default_mode"
          );
          if (connected && mode == "") {
            schema = input.data;
            clearInterval(mchenillard);
            downLED();
            mchenillard = setInterval(function() {
              chenillard(state);
              state = (state + 1) % 4;
            }, speed);
          } else {
            if (!connected) {
              console.log("Non connecté à la maquette");
              send_message_client(
                socket,
                "default_message",
                "Non connecté à la maquette",
                "default_mode"
              );
            } else {
              console.log("Maquette en mode jeu : " + mode);
              send_message_client(
                socket,
                "default_message",
                "Maquette en mode jeu : " + mode,
                "default_mode"
              );
            }
          }
          break;
        case "RESET":
          console.log("RESET");
          if (connected) {
            console.log("Reset des paramètres par défaut de la maquette");
            send_message_client(
              socket,
              "default_message",
              "Reset des paramètres par défaut de la maquette",
              "default_mode"
            );
            connection.Disconnect();
            clearInterval(mchenillard);
            downLED();
            mchenillard = "";
            connection = "";
            connected = false;
            init();
          } else {
            console.log("Non connecté à la maquette");
            send_message_client(
              socket,
              "default_message",
              "Non connecté à la maquette",
              "default_mode"
            );
          }
          break;
        default:
          console.log("Commande non supportée");
          send_message_client(
            socket,
            "default_message",
            "Commande non supportée",
            "default_mode"
          );
      }
    } catch (e) {
      console.log("Erreur lors du parse de la commande.");
    }
  });

  socket.on("order", function(data) {
    console.log(data);
    mode = "order";
    if (connected) {
      input = JSON.parse(data);
      switch (input.cmd) {
        case "INIT":
          if (reference === "") {
            mode = "order";
            console.log("Initialisation du order..");
            reference = shuffle_tab([0, 1, 2, 3], 30);
            console.log("Schéma du tableau : " + reference);
            send_message_client(socket, "init_matermind", reference, "game");
          } else {
            console.log("Le jeu est déjà lancé..");
            send_message_client(
              socket,
              "default_message",
              "Le jeu est déjà lancé..",
              "game"
            );
          }
          break;
        case "VERIFY":
          if (mode === "order" && reference != "") {
            result = verify_order(input.data, reference);
            result.then(function(value) {
              for (i = 0; i < 4; i++) {
                console.log(value[i]);
                if (value[i] == 1) {
                  console.log("OK");
                  blink(i, 2000);
                } else {
                  console.log("NOT OK");
                  blink(i, 600);
                }
              }
              send_message_client(socket, "verify_order", value, "game");
            });
            //.catch(error => {});
          } else {
            console.log(
              "Erreur lors de la vérification : jeu non lancé ou pas initialisé"
            );
            send_message_client(
              socket,
              "default_message",
              "Erreur lors de la vérification : jeu non lancé ou pas initialisé",
              "game"
            );
          }
          break;
        case "STOP":
          console.log(
            "Le jeu " +
              mode +
              " vient d'être stoppé. Retour au mode par défaut."
          );
          send_message_client(
            socket,
            "default_message",
            "Le jeu " +
              mode +
              " vient d'être stoppé. Retour au mode par défaut.",
            "game"
          );
          mode = "";
          reference = "";
          break;
        default:
          send_message_client(
            socket,
            "default_message",
            "Commande non supportée",
            "game"
          );
          console.log("Commande non supportée");
      }
    } else {
      console.log("Erreur lors du lancement du jeu : maquette non connectée.");
    }
  });

  // ---------------- SIMON -------------------------//

  socket.on("simon", function(data) {
    console.log(data);
    mode = "simon";
    if (connected) {
      input = JSON.parse(data);
      switch (input.cmd) {
        case "INIT":
          if (reference === "") {
            mode = "simon";
            console.log("Initialisation du simon..");
            reference = [];
            reference.push(Math.floor(Math.random() * 4) + 1);
            console.log("Schéma du tableau : " + reference);
            show_simon(reference);
          } else {
            console.log("Le jeu est déjà lancé..");
            send_message_client(
              socket,
              "default_message",
              "Le jeu est déjà lancé..",
              "game"
            );
          }
          break;
        case "VERIFY":
          if (mode === "simon" && reference != "") {
            if (input.data.toString() === reference.toString()) {
              reference.push(Math.floor(Math.random() * 4) + 1);
              send_message_client(socket, "verify_simon", true, "game");
              show_simon(reference);
              console.log("Nouvelle référence : " + reference);
            } else {
              send_message_client(socket, "verify_simon", false, "game");
            }
          } else {
            console.log(
              "Erreur lors de la vérification : jeu non lancé ou pas initialisé"
            );
            send_message_client(
              socket,
              "default_message",
              "Erreur lors de la vérification : jeu non lancé ou pas initialisé",
              "game"
            );
            mode = "";
            reference = "";
          }
          break;
        case "STOP":
          console.log(
            "Le jeu " +
              mode +
              " vient d'être stoppé. Retour au mode par défaut."
          );
          send_message_client(
            socket,
            "default_message",
            "Le jeu " +
              mode +
              " vient d'être stoppé. Retour au mode par défaut.",
            "game"
          );
          mode = "";
          reference = "";
          break;
        default:
          send_message_client(
            socket,
            "default_message",
            "Commande non supportée",
            "game"
          );
          console.log("Commande non supportée");
      }
    } else {
      console.log("Erreur lors du lancement du jeu : maquette non connectée.");
    }
  });
});

process.on("SIGINT", function() {
  console.log(" Ctrl+C détecté ! On coupe la connexion avec le serveur !");
  if (connected == true) {
    connection.Disconnect();
  }
  myObj = {
    cmd: "default_message",
    data: "Serveur Web déconnecté !"
  };
  myJSON = JSON.stringify(myObj);
  io.sockets.emit("default_mode", myJSON);
  process.exit();
});

app.get("/api/customers", (req, res) => {
  const customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 2, firstName: "Jean", lastName: "Dupont" },
    { id: 3, firstName: "Pierre", lastName: "Dubois" }
  ];
  res.json(customers);
});

app.use("/javascript", express.static(__dirname + "/javascript"));
app.use("/css", express.static(__dirname + "/css"));
app.use(
  "/socketio",
  express.static(__dirname + "/node_modules/socket.io-client/dist")
);

console.log("Lancement du serveur : http://localhost:" + port_server + "/");

httpServer.listen(port_server);
