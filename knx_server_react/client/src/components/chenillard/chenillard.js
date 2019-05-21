import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import amber from "@material-ui/core/colors/amber";
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";
import purple from "@material-ui/core/colors/purple";
import blue from "@material-ui/core/colors/blue";
import green from "@material-ui/core/colors/green";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { socket } from "../../App";

const Amber = amber[500];
const Orange = orange[800];
const Red = red[600];
const Purple = purple[400];
const Blue = blue[400];
const Green = green["A400"];

const styles = {
  root: {
    margin: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap"
  },
  tuile_yellow: {
    margin: 0,
    width: "33.33%",
    height: 300,
    background: Amber,
    textAlign: "center",
    lineHeight: 15
  },
  tuile_orange: {
    margin: 0,
    width: "33.33%",
    height: 300,
    background: Orange,
    textAlign: "center",
    lineHeight: 15
  },
  tuile_red: {
    margin: 0,
    width: "33.33%",
    height: 300,
    background: Red,
    textAlign: "center",
    lineHeight: 15
  },
  tuile_purple: {
    margin: 0,
    width: "33.33%",
    height: 300,
    background: Purple,
    textAlign: "center",
    lineHeight: 15
  },
  tuile_blue: {
    margin: 0,
    width: "33.33%",
    height: 300,
    background: Blue,
    textAlign: "center",
    lineHeight: 15
  },
  tuile_green: {
    margin: 0,
    width: "33.33%",
    height: 300,
    background: Green,
    textAlign: "center",
    lineHeight: 15
  },
  description_text: {
    lineHeight: 0,
    color: "white",
    fontStyle: "italic",
    fontSize: "1.3em",
    textAlign: "center"
  },
  button: {
    lineHeight: 0,
    borderColor: "white",
    color: "white",
    fontSize: "1.5em",
    borderRadius: "50px",
    borderWidth: "5px",
    width: 250,
    height: 80
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    minWidth: 120
  },
  fail: {
    color: Red,
    marginLeft: "25px"
  }
};

class Chenillard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      fail: false,
      LED_0: 0,
      LED_1: 0,
      LED_2: 0,
      LED_3: 0
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: Number(event.target.value) });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ fail: false });
  };

  failDetected = () => {
    this.setState({ fail: true });
  };

  onoff = () => {
    let myObj = {
      cmd: "ONOFF"
    };
    let myJSON = JSON.stringify(myObj);
    socket.emit("events", myJSON);
    console.log("ONOFF");
  };

  upspeed = () => {
    let myObj = {
      cmd: "UP"
    };
    let myJSON = JSON.stringify(myObj);
    socket.emit("events", myJSON);
    console.log("UP");
  };

  downspeed = () => {
    let myObj = {
      cmd: "DOWN"
    };
    let myJSON = JSON.stringify(myObj);
    socket.emit("events", myJSON);
    console.log("DOWN");
  };

  reverse = () => {
    let myObj = {
      cmd: "REVERSE"
    };
    let myJSON = JSON.stringify(myObj);
    socket.emit("events", myJSON);
    console.log("REVERSE");
  };

  changeschema = () => {
    let myObj = {
      cmd: "SCHEMA",
      data: [
        this.state.LED_0,
        this.state.LED_1,
        this.state.LED_2,
        this.state.LED_3
      ]
    };
    let myJSON = JSON.stringify(myObj);
    socket.emit("events", myJSON);
    console.log("CHANGEMENT SCHEMA : " + myJSON);
  };

  reset = () => {
    let myObj = {
      cmd: "RESET"
    };
    let myJSON = JSON.stringify(myObj);
    socket.emit("events", myJSON);
    console.log("RESET");
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.tuile_yellow}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={this.onoff}
          >
            Let's go / off !
          </Button>
          <div className={classes.description_text}>
            <p>Lancement / arrêt du chenillard</p>
          </div>
        </div>
        <div className={classes.tuile_orange}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={this.reverse}
          >
            Reverse !
          </Button>
          <p className={classes.description_text}>
            Changement de sens du chenillard
          </p>
        </div>
        <div className={classes.tuile_red}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={this.handleClickOpen}
          >
            Change !
          </Button>
          <p className={classes.description_text}>
            Entrer 1, 2, 3 & 4 pour changer l'ordre des LED
          </p>
        </div>
        <div className={classes.tuile_purple}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={this.upspeed}
          >
            Speed Up !
          </Button>
          <p className={classes.description_text}>
            Accèlère la vitesse du chenillard !
          </p>
        </div>
        <div className={classes.tuile_blue}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={this.downspeed}
          >
            Speed Down !
          </Button>
          <p className={classes.description_text}>Ralentis bonhomme !</p>
        </div>
        <div className={classes.tuile_green}>
          <Button
            variant="outlined"
            className={classes.button}
            onClick={this.reset}
          >
            YOUR SPEED !
          </Button>
          <p className={classes.description_text}>Choisis ta vitesse !</p>
        </div>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Choisi l'ordre des LED</DialogTitle>
          {this.state.fail ? (
            <p className={classes.fail}>
              Veuillez choisir une position unique pour chaque LED.
            </p>
          ) : (
            <p />
          )}
          <DialogContent>
            <form className={classes.container}>
              <FormControl required className={classes.formControl}>
                <InputLabel>LED 1</InputLabel>
                <Select
                  native
                  value={this.state.LED_0}
                  onChange={this.handleChange("LED_0")}
                  input={<Input id="age-native-simple" />}
                >
                  <option value="" />
                  <option value={0}>position 1</option>
                  <option value={1}>position 2</option>
                  <option value={2}>position 3</option>
                  <option value={3}>position 4</option>
                </Select>
              </FormControl>
              <FormControl required className={classes.formControl}>
                <InputLabel>LED 2</InputLabel>
                <Select
                  native
                  value={this.state.LED_1}
                  onChange={this.handleChange("LED_1")}
                  input={<Input id="age-native-simple" />}
                >
                  <option value="" />
                  <option value={0}>position 1</option>
                  <option value={1}>position 2</option>
                  <option value={2}>position 3</option>
                  <option value={3}>position 4</option>
                </Select>
              </FormControl>
              <FormControl required className={classes.formControl}>
                <InputLabel>LED 3</InputLabel>
                <Select
                  native
                  value={this.state.LED_2}
                  onChange={this.handleChange("LED_2")}
                  input={<Input id="age-native-simple" />}
                >
                  <option value="" />
                  <option value={0}>position 1</option>
                  <option value={1}>position 2</option>
                  <option value={2}>position 3</option>
                  <option value={3}>position 4</option>
                </Select>
              </FormControl>
              <FormControl required className={classes.formControl}>
                <InputLabel>LED 4</InputLabel>
                <Select
                  native
                  value={this.state.LED_3}
                  onChange={this.handleChange("LED_3")}
                  input={<Input id="age-native-simple" />}
                >
                  <option value="" />
                  <option value={0}>position 1</option>
                  <option value={1}>position 2</option>
                  <option value={2}>position 3</option>
                  <option value={3}>position 4</option>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (
                  this.state.LED_0 +
                    this.state.LED_1 +
                    this.state.LED_2 +
                    this.state.LED_3 ===
                    6 &&
                  this.state.LED_0 !== this.state.LED_1 &&
                  this.state.LED_0 !== this.state.LED_1
                ) {
                  this.handleClose();
                  this.changeschema();
                } else {
                  this.failDetected();
                }
              }}
              color="secondary"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Chenillard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Chenillard);
