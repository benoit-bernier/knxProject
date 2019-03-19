const knx = require("knx");
let state = 0; // state for the chenillard
let speed = 500; // default time between two commands
let speed_ratio = 1.5; // real speed = speed * speed_ratio (allow to increase or decrease the speed of the chenillard)
let schema = [0, 1, 2, 3];

let mchenillard = ""; //instance du chenillard

function chenillard(state) {
  connection.write("0/1/" + schema[(state + 1) % 4] + 1, 1);
  connection.write("0/1/" + schema[state % 4] + 1, 0);
  console.log("Vitesse actuelle : " + speed * speed_ratio);
}

let connection = new knx.Connection({
  // ip address and port of the KNX router or interface
  ipAddr: "192.168.0.5",
  port: 3671,
  minimumDelay: 50,
  handlers: {
    // wait for connection establishment before sending anything!
    connected: function() {
      // partie connexion
      console.log("Connected !");

      //lancement du chenillard

      mchenillard = setInterval(function() {
        chenillard(state);
        console.log("State = " + state);
        state = state++ % 4;
        console.log("State after = " + state);
      }, speed * speed_ratio);

      function chenillard(state) {
        connection.write("0/1/" + schema[(state + 1) % 4] + 1, 1);
        connection.write("0/1/" + schema[state % 4] + 1, 0);
        console.log("Vitesse actuelle : " + speed * speed_ratio);
      }
      // fin partie connexion
    },
    // get notified for all KNX events:
    event: function(evt, src, dest, value) {
      switch (dest) {
        case "0/3/1":
          if (speed_ratio < 1) {
            console.log("Impossible d'accélérer.");
          } else {
            //Accelere
            clearInterval(mchenillard);
            mchenillard = setInterval(function() {
              chenillard(state);
              state = state++ % 4;
            }, speed * speed_ratio);
            speed_ratio -= 1;
            console.log("La vitesse est de :" + speed_ratio);
          }
          break;
        case "0/3/2":
          if (speed_ratio > 5) {
            console.log("Impossible de ralentir.");
          } else {
            //Ralenti
            speed_ratio += 1;
            clearInterval(mchenillard);
            mchenillard = setInterval(function() {
              chenillard(state);
              state = state++ % 4;
            }, speed * speed_ratio);
            console.log("La vitesse est de :" + speed_ratio);
          }
          //Ralenti
          break;
        case "0/3/3":
          if (mchenillard == "") {
            mchenillard = setInterval(function() {
              chenillard(state);
              state = state++ % 4;
            }, speed * speed_ratio);
          } else {
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
            state = (state++ % 4) + 3;
          }, speed * speed_ratio);
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
