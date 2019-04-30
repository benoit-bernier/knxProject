import React, { Component } from "react";
import "./state_maquette.css";

class StateMaquette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      information: props.information
    };
  }
  render() {
    return (
      <div className="container_state">
        <div className="colonne_state colonne_state_description">
          <p> Status du service :</p>
        </div>
        <div className="colonne_state">
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
        <div className="colonne_state">
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

export default StateMaquette;
