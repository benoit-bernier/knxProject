const knx = require("knx");

let connection = new knx.Connection({
  // ip address and port of the KNX router or interface
  ipAddr: "192.168.0.5",
  port: 3671,
  minimumDelay: 1000,
  handlers: {
    // wait for connection establishment before sending anything!
    connected: function() {
      console.log("Connected !");
      // Allumer la LED
      connection.write("0/0/1", 1);
      sleep();
      connection.write("0/0/1", 1);
      sleep();
      connection.write("0/0/1", 1);
      sleep();
      // you can also issue a READ request and pass a callback to capture the response
      connection.read("0/2/1", (src, responsevalue) => {
        console.log("src : " + src + ", responsevalue" + responsevalue);
      });

      function sleep() {
        setTimeout(function() {
          console.log("Sleep over");
        }, 1000);
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
