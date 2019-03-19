class chenillard {
  const minimumDelay=500;
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
    this.intervalle = intervalle;
  }

  stop() {
    console.log("chenillard arrêté");
  }
  start(){
    setInterval(function() {
      chenillard(state);
      console.log("State = " + state);
      state = (state + direction) % 4;
    }, minimumDelay+this.intervalle);
  }
  defile() {
    console.log("chenillard démarré");
    switch (Math.abs(state)) {
      case 0:
        //console.log("Lancé LED 1");
        connection.write("0/1/1", 1);
        connection.write("0/1/4", 0);
        console.log("Vitesse actuelle : " + speed * speed_ratio);
        break;
      case 1:
        //console.log("Lancé LED 2");
        connection.write("0/1/2", 1);
        connection.write("0/1/1", 0);
        break;
      case 2:
        //console.log("Lancé LED 3");
        connection.write("0/1/3", 1);
        connection.write("0/1/2", 0);
        break;
      case 3:
        //console.log("Lancé LED 0");
        connection.write("0/1/4", 1);
        connection.write("0/1/3", 0);
        break;
      default:
        console.log("STOP chenillard");
    }
  }
}
