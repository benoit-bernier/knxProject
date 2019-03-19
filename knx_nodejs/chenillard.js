<<<<<<< HEAD
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
=======
class chenillard {
  constructor(tableau, intervalle, state) {
    this.tableau = tableau;
    this.intervalle = intervalle;
    this.state = state;
  }
  get tableau() {
    return this.tableau;
  }
  get state() {
    return this.state;
  }
  get intervalle() {
    return this.intervalle;
  }
  set tableau(tab) {
    this.tableau = tab;
  }
  set state(state) {
    this.state = state;
  }
  set intervalle(intervalle) {
    intervalle;
  }
>>>>>>> 9efa772f91b4f2fea7e0f3a3af35d2724aa0ba5a

  stop() {
    console.log("chenillard arrêté");
  }
  start() {
    console.log("chenillard démarré");
  }
}
