let state = 0;
let speed = 1000;
let speed_ratio = 1.5;
let schema = [0, 1, 2, 3];

let mChenillard = setInterval(function() {
  chenillard(state);
  state = (state + 1) % 4;
}, speed * speed_ratio);

function chenillard(state) {
  console.log("0/1/" + (schema[(state + 1) % 4] + 1));
  console.log("0/1/" + (schema[state % 4] + 1));
  //console.log(schema[(state + 1) % 4] + 1);
  //console.log(schema[state % 4] + 1);
  //console.log("Vitesse actuelle : " + speed * speed_ratio);
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
