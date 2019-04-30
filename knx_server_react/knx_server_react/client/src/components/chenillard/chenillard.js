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
    borderWidth: "1px",
    borderRadius: "50px",
    borderWidth: "5px",
    width: 250,
    height: 80
  }
};

class Chenillard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.tuile_yellow}>
          <Button variant="outlined" className={classes.button}>
            Let's go !
          </Button>
          <div className={classes.description_text}>
            <p>Lancement du chenillard</p>
          </div>
        </div>
        <div className={classes.tuile_orange}>
          <Button variant="outlined" className={classes.button}>
            Reverse !
          </Button>
          <p className={classes.description_text}>
            Changement de sens du chenillard
          </p>
        </div>
        <div className={classes.tuile_red}>
          <Button variant="outlined" className={classes.button}>
            Change !
          </Button>
          <p className={classes.description_text}>
            Entrer 1, 2, 3 & 4 pour changer l'ordre des LED
          </p>
        </div>
        <div className={classes.tuile_purple}>
          <Button variant="outlined" className={classes.button}>
            Speed Up !
          </Button>
          <p className={classes.description_text}>
            Accèlère la vitesse du chenillard !
          </p>
        </div>
        <div className={classes.tuile_blue}>
          <Button variant="outlined" className={classes.button}>
            Speed Down !
          </Button>
          <p className={classes.description_text}>Ralentis bonhomme !</p>
        </div>
        <div className={classes.tuile_green}>
          <Button variant="outlined" className={classes.button}>
            Reset !
          </Button>
          <p className={classes.description_text}>
            Un bug ? Relance la maquette !
          </p>
        </div>
      </div>
    );
  }
}

Chenillard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Chenillard);
