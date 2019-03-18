const knx = require("knx");
let state = 0; // state for the chenillard
let speed = 500; // default time between two commands
let speed_ratio = 1.5; // real speed = speed * speed_ratio (allow to increase or decrease the speed of the chenillar)
let direction = 1; //sens du chenillard

let mChenillard = ""; //instance du chenillard

function chenillard(state) {
  switch (Math.abs(state)) {
    case 0:
      //console.log("Lancé LED 1");
      connection.write("0/1/1", 1);
      connection.write("0/1/4", 0);
      console.log("Vitesse actuelle : " + speed * speed_ratio);
      break;
    case 1:
      //console.log("Lancé LED 2");
      connection.write("0/1/2", 1);
      connection.write("0/1/1", 0);
      break;
    case 2:
      //console.log("Lancé LED 3");
      connection.write("0/1/3", 1);
      connection.write("0/1/2", 0);
      break;
    case 3:
      //console.log("Lancé LED 0");
      connection.write("0/1/4", 1);
      connection.write("0/1/3", 0);
      break;
    default:
      console.log("STOP chenillard");
  }
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
      /*
      let state = 0; // state for the chenillar
      let speed = 500; // default time between two commands
      let speed_ratio = 1.5; // real speed = speed * speed_ratio (allow to increase or decrease the speed of the chenillar)
        */
      console.log("Connected !");

      //lancement du chenillar
      //allume une LED avec l'état correspondant

      mChenillard = setInterval(function() {
        chenillard(state);
        state = Math.abs(state + direction) % 4;
      }, speed * speed_ratio);

      function chenillard(state) {
        switch (state) {
          case 0:
            //console.log("Lancé LED 1");
            connection.write("0/1/1", 1);
            connection.write("0/1/4", 0);
            console.log("Vitesse actuelle : " + speed * speed_ratio);
            break;
          case 1:
            //console.log("Lancé LED 2");
            connection.write("0/1/2", 1);
            connection.write("0/1/1", 0);
            break;
          case 2:
            //console.log("Lancé LED 3");
            connection.write("0/1/3", 1);
            connection.write("0/1/2", 0);
            break;
          case 3:
            //console.log("Lancé LED 0");
            connection.write("0/1/4", 1);
            connection.write("0/1/3", 0);
            break;
          default:
            console.log("STOP chenillard");
        }
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
            clearInterval(mChenillard);
            mChenillard = setInterval(function() {
              chenillard(state);
              state = Math.abs(state + direction) % 4;
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
            clearInterval(mChenillard);
            mChenillard = setInterval(function() {
              chenillard(state);
              state = Math.abs(state + direction) % 4;
            }, speed * speed_ratio);
            console.log("La vitesse est de :" + speed_ratio);
          }
          //Ralenti
          break;
        case "0/3/3":
          if (mChenillard == "") {
            mChenillard = setInterval(function() {
              chenillard(state);
              state = (state + direction) % 4;
            }, speed * speed_ratio);
          } else {
            mChenillard = "";
          }
          break;
        case "0/3/4":
          console.log("Changement de sens du chenillard");
          direction *= -1;
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
