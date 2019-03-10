const knx = require("knx");

let connection = new knx.Connection({
  // ip address and port of the KNX router or interface
  ipAddr: "192.168.0.5",
  port: 3671,
  minimumDelay: 1000,
  handlers: {
    // wait for connection establishment before sending anything!
    connected: function() {
      let state = 0; // state for the chenillard
      console.log("Connected !");

      //lancement du chenillard
      //allume une LED avec l'état correspondant
      let mChenillard = setInterval(function() {
        chenillard(state);
        state = (state + 1) % 4;
      }, 2000);

      //coupe le chenillard après 10 secondes
      setTimeout(function() {
        clearInterval(mChenillard);
      }, 10000);

      //permet d'allumer les LED les unes après les autres
      function chenillard(state) {
        switch (state) {
          case 0:
            console.log("Lancé LED 1");
            connection.write("0/0/2", 1);
            //ou coupe la LED précédente après 1 seconde
            setTimeout(function() {
              connection.write("0/0/1", 0);
            }, 1000);
            break;
          case 1:
            console.log("Lancé LED 2");
            connection.write("0/0/3", 1);
            setTimeout(function() {
              connection.write("0/0/2", 0);
            }, 1000);
            break;
          case 2:
            console.log("Lancé LED 3");
            connection.write("0/0/4", 1);
            setTimeout(function() {
              connection.write("0/0/3", 0);
            }, 1000);
            break;
          case 3:
            console.log("Lancé LED 0");
            connection.write("0/0/1", 1);
            setTimeout(function() {
              connection.write("0/0/4", 0);
            }, 1000);
            break;
          default:
            console.log("STOP chenillard");
        }
      }
    },
    // get notified for all KNX events:
    event: function(evt, src, dest, value) {
      console.log(
        "event: %s, src: %j, dest: %j, value: %j",
        evt,
        src,
        dest,
        value
      );
    },
    // get notified on connection errors
    error: function(connstatus) {
      console.log("**** ERROR: %j", connstatus);
    }
  }
});
