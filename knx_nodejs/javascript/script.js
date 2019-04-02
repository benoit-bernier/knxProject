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
    data: [2, 1, 3, 0]
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

function postInitMastermind() {
  let buttonInitMastermind = document.querySelector(
    '[name="buttonInitMastermind"]'
  );
  buttonInitMastermind.setAttribute("disabled", true);
  let buttonVerifyMastermind = document.querySelector(
    '[name="buttonVerifyMastermind"]'
  );
  buttonVerifyMastermind.removeAttribute("disabled");
  let buttonStopMastermind = document.querySelector(
    '[name="buttonStopMastermind"]'
  );
  buttonStopMastermind.removeAttribute("disabled");
  let myObj = {
    cmd: "INIT"
  };
  let myJSON = JSON.stringify(myObj);
  socket.emit("mastermind", myJSON);
}

function postVerifyMastermind() {
  let buttonStopMastermind = document.querySelector(
    '[name="buttonStopMastermind"]'
  );
  let tab = [];
  tab[0] = document.getElementById("LED_0_user").value;
  tab[1] = document.getElementById("LED_1_user").value;
  tab[2] = document.getElementById("LED_2_user").value;
  tab[3] = document.getElementById("LED_3_user").value;
  buttonStopMastermind.removeAttribute("disabled");
  let myObj = {
    cmd: "VERIFY",
    data: tab
  };
  let myJSON = JSON.stringify(myObj);
  socket.emit("mastermind", myJSON);
  let buttonVerifyMastermind = document.querySelector(
    '[name="buttonVerifyMastermind"]'
  );
  buttonVerifyMastermind.setAttribute("disabled", true);
  setTimeout(function() {
    buttonVerifyMastermind.removeAttribute("disabled");
  }, 3000);
}

function postStopMastermind() {
  let buttonVerifyMastermind = document.querySelector(
    '[name="buttonInitMastermind"]'
  );
  buttonVerifyMastermind.removeAttribute("disabled");
  let buttonStopMastermind = document.querySelector(
    '[name="buttonStopMastermind"]'
  );
  buttonStopMastermind.setAttribute("disabled", true);

  let myObj = {
    cmd: "STOP"
  };
  let myJSON = JSON.stringify(myObj);
  socket.emit("mastermind", myJSON);
}

function increaseValue(id) {
  var value = parseInt(document.getElementById(id).value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById(id).value = value % 4;
  document.getElementById(id).innerHTML = document.getElementById(id).value;
}

socket.on("default_mode", function(data) {
  let input = JSON.parse(data);
  switch (input.cmd) {
    case "default_message":
      str = input.data;
      break;
    default:
      console.log("Command not supported..");
  }
  document.getElementById("message").innerHTML = str;
});

socket.on("state_led", function(data) {
  let input = JSON.parse(data);
  switch (input.cmd) {
    case "state_led_1":
      let mButton = document.getElementById("LED_0");
      if (input.data == 0) {
        mButton.style.backgroundColor = "red";
      } else {
        mButton.style.backgroundColor = "green";
      }
      break;
    case "state_led_2":
      str = input.data;
      break;
    case "state_led_3":
      str = input.data;
      break;
    case "state_led_4":
      str = input.data;
      break;
    default:
      console.log("Command not supported..");
  }
  document.getElementById("message").innerHTML = str;
});

socket.on("game", function(data) {
  let input = JSON.parse(data);
  switch (input.cmd) {
    case "default_message":
      str = input.data;
      break;
    case "init_matermind":
      str = "Lancement / Reset du Mastermind : " + input.data;
      break;
    case "verify_matermind":
      let clear = true;
      for (i = 0; i < input.data.length; i++) {
        if (input.data[i] == 0) {
          clear = false;
          str = "Résultat Mastermind : " + input.data;
          let mButton = document.getElementById("LED_" + i + "_user");
          mButton.style.backgroundColor = "red";
        } else {
          let mButton = document.getElementById("LED_" + i + "_user");
          mButton.style.backgroundColor = "green";
        }
      }
      if (clear) {
        str =
          "Bravo ! Vous avez trouvé la bonne combinaison !!  Le jeu se fermera dans 3 secondes !";
        setTimeout(function() {
          postStopMastermind();
        }, 3000);
      }
      break;
    default:
      console.log("Command not supported..");
  }
  document.getElementById("message").innerHTML = str;
});
