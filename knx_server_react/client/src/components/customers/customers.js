import React, { Component } from "react";
import "./customers.css";
import socketIOClient from "socket.io-client";

let socket;
class Customers extends Component {
  constructor() {
    super();
    this.state = {
      customers: [],
      endpoint: "http://localhost:5000/"
    };
  }

  componentDidMount() {
    fetch("/api/customers")
      .then(res => res.json())
      .then(customers =>
        this.setState({ customers }, () =>
          console.log("Customers fetch...", customers)
        )
      );
    socket = socketIOClient(this.state.endpoint);
    socket.on("connection", console.log("aaaaaaaaaaaa"));
  }

  yaaaaa = () => {
    console.log("coucou");
    let myObj = {
      cmd: "CONNECT"
    };
    let myJSON = JSON.stringify(myObj);
    socket.emit("events", myJSON);
  };

  render() {
    return (
      <div className="customers-list">
        <button type="button" onClick={this.yaaaaa}>
          A LATTAQUE !!!!!!!!!!!!!
        </button>
        <h2> Customers </h2>
        <ul>
          {this.state.customers.map(customers => (
            <li key={customers.id}>
              {customers.firstName} {customers.lastName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Customers;
