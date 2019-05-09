import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import "typeface-roboto";
import Chenillard from "./components/chenillard/chenillard";
import LampVisu from "./components/lamp_visu/lamp_visu";
import Topbar from "./components/topbar/topbar";
import BottomBar from "./components/bottombar/bottombar";
import Gamebar from "./components/gamebar/gamebar";

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
          <BottomBar />
        </div>
      </Router>
    );
  }
}

export default withStyles(styles)(App);
