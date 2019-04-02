function testAlert() {
  window.alert("Test");
}

let socket = io.connect(window.location.protocol +
  "//" +
  window.location.hostname +
  ":" +
  window.location.port
);

function connect() {
  let myObj = {
    cmd: "CONNECT"
  };
  let myJSON = JSON.stringify(myObj);
  socket.emit("events", myJSON);
}

function disconnect() {
  let myObj = {
    cmd: "DISCONNECT"
  };
  let myJSON = JSON.stringify(myObj);
  socket.emit("events", myJSON);
}
function postUP() {
  let myObj = {
    cmd: "UP"
  };
  let myJSON = JSON.stringify(myObj);
  socket.emit("events", myJSON);
}
function postDOWN() {
  let myObj = {
    cmd: "DOWN"
  };
  let myJSON = JSON.stringify(myObj);
  socket.emit("events", myJSON);
}
function postONOFF() {
  let myObj = {
    cmd: "ONOFF"
  };
  let myJSON = JSON.stringify(myObj);
  socket.emit("events", myJSON);
}
function postREVERSE() {
  let myObj = {
    cmd: "REVERSE"
  };
  let myJSON = JSON.stringify(myObj);
  socket.emit("events", myJSON);
}
function postSCHEMA() {
  let myObj = {
    cmd: "SCHEMA",
    data: [2, 1, 3, 4]
  };
  let myJSON = JSON.stringify(myObj);
  socket.emit("events", myJSON);
}
function postRESET() {
  let myObj = {
    cmd: "RESET"
  };
  let myJSON = JSON.stringify(myObj);
  socket.emit("events", myJSON);
}
