import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import socketIOClient from "socket.io-client";
import { withStyles } from "@material-ui/core/styles";
import "typeface-roboto";
import Chenillard from "./components/chenillard/chenillard";
import LampVisu from "./components/lamp_visu/lamp_visu";
import Topbar from "./components/topbar/topbar";
import BottomBar from "./components/bottombar/bottombar";
import Gamebar from "./components/gamebar/gamebar";
import About from "./components/about/about";
import Order from "./components/order/order";

var socket;

const styles = {
  root: {
    width: "100%",
    background: "white",
    margin: 0,
    padding: 0,
    height: "100%"
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: "http://localhost:5000/"
    };

    socket = socketIOClient(this.state.endpoint);
  }
  render() {
    const { classes } = this.props;
    return (
      <Router>
        <div className={classes.root}>
          <Topbar />
          <Route exact path="/" component={LampVisu} />
          <Route exact path="/games" component={Gamebar} />
          <Route exact path="/chenillard" component={Chenillard} />
          <Route exact path="/lamp_visu" component={LampVisu} />
          <Route exact path="/about" component={About} />
          <Route exact path="/order" component={Order} />
          <BottomBar />
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
export { socket };
