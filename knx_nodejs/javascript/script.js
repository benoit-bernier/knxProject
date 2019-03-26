function testAlert() {
  window.alert("Test");
}

let socket = io.connect("http://localhost:3000");

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
function postInitMastermind() {
  let myObj = {
    cmd: "INIT"
  };
  let myJSON = JSON.stringify(myObj);
  socket.emit("mastermind", myJSON);
}
function postResetMastermind(tab) {
  let myObj = {
    cmd: "RESET"
  };
  let myJSON = JSON.stringify(myObj);
  socket.emit("mastermind", myJSON);
}
function postVerifyMastermind(tab) {
  let myObj = {
    cmd: "VERIFY",
    data: tab
  };
  let myJSON = JSON.stringify(myObj);
  socket.emit("mastermind", myJSON);
}
function postStopMastermind() {
  let myObj = {
    cmd: "STOP"
  };
  let myJSON = JSON.stringify(myObj);
  socket.emit("mastermind", myJSON);
}
