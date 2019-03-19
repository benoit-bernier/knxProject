function testAlert() {
  window.alert("Test");
}

function postUP() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/test", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log(this.responseText);
    }
  };

  let myObj = {
    cmd: "UP"
  };
  let myJSON = JSON.stringify(myObj);
  xhr.send(myJSON.toString());
}
function postDOWN() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/test", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log(this.responseText);
    }
  };

  let myObj = {
    cmd: "DOWN"
  };
  let myJSON = JSON.stringify(myObj);
  xhr.send(myJSON.toString());
}
function postONOFF() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/test", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log(this.responseText);
    }
  };

  let myObj = {
    cmd: "ONOFF"
  };
  let myJSON = JSON.stringify(myObj);
  xhr.send(myJSON.toString());
}
function postREVERSE() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/test", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
      console.log(this.responseText);
    }
  };

  let myObj = {
    cmd: "REVERSE"
  };
  let myJSON = JSON.stringify(myObj);
  xhr.send(myJSON.toString());
}
