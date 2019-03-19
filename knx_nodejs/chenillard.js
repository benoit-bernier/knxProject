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

  stop() {
    console.log("chenillard arrêté");
  }
  start() {
    console.log("chenillard démarré");
  }
}
