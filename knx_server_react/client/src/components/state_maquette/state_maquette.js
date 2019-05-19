import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { socket } from "../../App";

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
      state_maquette: false,
      state_connection: false,
      address_IP_maquette: "",
      port_maquette: ""
    };
  }

  componentDidMount = () => {
    socket.on("state", data => {
      let input = JSON.parse(data);
      try {
        switch (input.cmd) {
          case "state_server":
            this.setState({
              state_maquette: input.data
            });
            break;
          case "state_connection":
            this.setState({
              state_connection: input.data
            });
            break;
          case "state_ip_maquette":
            this.setState({
              address_IP_maquette: input.data
            });
            break;
          case "state_ip_client":
            this.setState({
              address_IP: input.data
            });
            break;
          case "state_port_maquette":
            this.setState({
              port_maquette: input.data
            });
            break;
          default:
          //console.log("Command not supported..");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.colonne_state}>
          <p> Status du service :</p>
        </div>
        <div className={classes.colonne_state}>
          {this.state.state_maquette ? (
            <p>
              État liaison serveur :{" "}
              <span style={{ color: "green" }}>connectée</span>
            </p>
          ) : (
            <p>
              État liaison serveur :{" "}
              <span style={{ color: "red" }}>déconnectée</span>
            </p>
          )}
          {this.state.state_connection ? (
            <p>
              État liaison maquette :{" "}
              <span style={{ color: "green" }}>connectée</span>
            </p>
          ) : (
            <p>
              État liaison maquette :{" "}
              <span style={{ color: "red" }}>non connectée</span>
            </p>
          )}
        </div>
        <div className={classes.colonne_state}>
          <p>
            Adresse IP de la maquette :{" "}
            {this.state.address_IP_maquette.toString()}
          </p>
          <p>Port de la maquette : {this.state.port_maquette.toString()}</p>
        </div>
      </div>
    );
  }
}

StateMaquette.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StateMaquette);
