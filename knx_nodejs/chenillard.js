let state = 0;
let speed = 1000;
let speed_ratio = 1.5;

let mChenillard = setInterval(function() {
  chenillard(state);
  state = (state + 1) % 4;
}, speed * speed_ratio);

function chenillard(state) {
  console.log(state);
  switch (state) {
    case 0:
      console.log("Lancer LED 1");
      setTimeout(function() {
        console.log("Eteindre LED 0");
        console.log("======");
      }, (speed * speed_ratio) / 2);
      break;
    case 1:
      console.log("Lancer LED 2");
      setTimeout(function() {
        console.log("Eteindre LED 1");
        console.log("======");
      }, (speed * speed_ratio) / 2);
      break;
    case 2:
      console.log("Lancer LED 3");
      setTimeout(function() {
        console.log("Eteindre LED 2");
        console.log("======");
      }, (speed * speed_ratio) / 2);

      break;
    case 3:
      console.log("Lancer LED 0");
      setTimeout(function() {
        console.log("Eteindre LED 3");
        console.log("======");
      }, (speed * speed_ratio) / 2);

      break;
    default:
      console.log("Stop");
  }
}

/*
setTimeout(function() {
  clearInterval(mChenillard);
}, 30000);
*/

setTimeout(function() {
  //state = 0;
  speed_ratio = 2;
  clearInterval(mChenillard);
  mChenillard = setInterval(function() {
    chenillard(state);
    state = (state + 1) % 4;
    console.log(speed_ratio);
  }, speed * speed_ratio);
}, 10000);

setTimeout(function() {
  //state = 0;
  speed_ratio = 2.5;
  clearInterval(mChenillard);
  mChenillard = setInterval(function() {
    chenillard(state);
    state = (state + 1) % 4;
    console.log(speed_ratio);
  }, speed * speed_ratio);
}, 20000);
