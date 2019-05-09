import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import red from "@material-ui/core/colors/red";

const Red = red[600];

const styles = {
  root: {
    flexGrow: 1,
    textAlign: "center",
    width: "100%"
  },
  bottombar_link: {
    color: "white"
  }
};

class BottomBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <p>
            Service proposé par Alexandre & Benoît (alias BB), les créateurs du
            cultissime{" "}
            <a
              className={classes.bottombar_link}
              href="https://play.google.com/store/apps/details?id=alexandre.testapp.sailorapp&hl=en_US"
              target="_blank"
            >
              SailorApp
            </a>{" "}
            - Projet réalisé en 2019
          </p>
        </AppBar>
      </div>
    );
  }
}

BottomBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BottomBar);
