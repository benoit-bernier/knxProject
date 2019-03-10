const knx = require("knx");

let connection = new knx.Connection({
  // ip address and port of the KNX router or interface
  ipAddr: "192.168.0.5",
  port: 3671,
  minimumDelay: 1000,
  handlers: {
    // wait for connection establishment before sending anything!
    connected: function() {
      // partie connexion
      let state = 0; // state for the chenillar
      let speed = 1000; // default time between two commands
      let speed_ratio = 1; // real speed = speed * speed_ratio (allow to increase or decrease the speed of the chenillar)

      console.log("Connected !");

      //lancement du chenillar
      //allume une LED avec l'état correspondant
      let mChenillar = setInterval(function() {
        chenillar(state);
        state = (state + 1) % 4;
      }, 2000);

      //coupe le chenillar après 20 secondes
      setTimeout(function() {
        clearInterval(mChenillar);
      }, 20000);

      //augmente la vitesse du chenillar après 10 secondes
      setTimeout(function() {
        state = 0;
        speed_ratio = 0.5;
        clearInterval(mChenillar);
        mChenillar = setInterval(function() {
          chenillar(state);
          state = (state + 1) % 4;
          console.log(speed_ratio);
        }, speed * speed_ratio);
      }, 10000);

      //permet d'allumer les LED les unes après les autres
      function chenillar(state) {
        switch (state) {
          case 0:
            console.log("Lancé LED 1");
            connection.write("0/0/2", 1);
            //ou coupe la LED précédente après 1 seconde
            setTimeout(function() {
              connection.write("0/0/1", 0);
            }, speed * speed_ratio);
            break;
          case 1:
            console.log("Lancé LED 2");
            connection.write("0/0/3", 1);
            setTimeout(function() {
              connection.write("0/0/2", 0);
            }, speed * speed_ratio);
            break;
          case 2:
            console.log("Lancé LED 3");
            connection.write("0/0/4", 1);
            setTimeout(function() {
              connection.write("0/0/3", 0);
            }, speed * speed_ratio);
            break;
          case 3:
            console.log("Lancé LED 0");
            connection.write("0/0/1", 1);
            setTimeout(function() {
              connection.write("0/0/4", 0);
            }, speed * speed_ratio);
            break;
          default:
            console.log("STOP chenillar");
        }
      }
      // fin partie connexion
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
