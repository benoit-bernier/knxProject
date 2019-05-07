import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    color: "black",
    fontStyle: "oblique",
    fontVariant: "small-caps",
    fontSize: "1.1em",
    fontWeight: "500"
  },
  colonne_state: {
    verticalAlign: "top",
    marginLeft: "5%",
    flexGrow: "1",
    display: "inline-block",
    width: "25%"
  }
};

class StateMaquette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      information: props.information
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.colonne_state}>
          <p> Status du service :</p>
        </div>
        <div className={classes.colonne_state}>
          {this.state.information.state_maquette ? (
            <p>
              État de la maquette :{" "}
              <span style={{ color: "green" }}>connectée</span>
            </p>
          ) : (
            <p>
              État de la maquette :{" "}
              <span style={{ color: "red" }}>déconnectée</span>
            </p>
          )}
          {this.state.information.state_connection ? (
            <p>
              État de la connexion :{" "}
              <span style={{ color: "green" }}>appareillée</span>
            </p>
          ) : (
            <p>
              État de la connexion :{" "}
              <span style={{ color: "red" }}>non appareillée</span>
            </p>
          )}
        </div>
        <div className={classes.colonne_state}>
          <p>
            Adresse IP de la maquette :{" "}
            {this.state.information.address_IP_maquette.toString()}
          </p>
          <p>
            Adresse IP du client :{" "}
            {this.state.information.address_IP_client.toString()}
          </p>
        </div>
      </div>
    );
  }
}

StateMaquette.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StateMaquette);
