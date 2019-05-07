import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import StateMaquette from "../state_maquette/state_maquette";
import red from "@material-ui/core/colors/red";
import { Help } from "@material-ui/icons";
import ghost from "./ghost.svg";
import { Link } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  icon: {
    fontSize: 30,
    "&:hover": {
      color: red[400]
    }
  },
  bouton_base: {
    color: "black",
    borderTop: "0",
    borderRight: "0",
    borderLeft: "0",
    borderBottom: "0",
    fontWeight: 700,
    boxShadow: "none",
    textTransform: "uppercase",
    fontSize: 16,
    padding: "6px 12px",
    background: "white",
    lineHeight: 1.5,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      border: "0",
      background: "white"
    },
    "&:active": {
      borderBottom: "4px solid",
      borderColor: "#666699"
    },
    "&:focus": {
      boxShadow: "none",
      borderBottom: "4px solid",
      borderColor: "#666699"
    }
  },
  bouton_base_clicked: {
    borderTop: "0",
    borderRight: "0",
    borderLeft: "0",
    borderBottom: "4px solid",
    fontWeight: 700,
    boxShadow: "none",
    textTransform: "uppercase",
    fontSize: 16,
    padding: "6px 12px",
    background: "white",
    lineHeight: 1.5,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      border: "0",
      background: "white"
    },
    "&:active": {
      borderTop: "0",
      borderRight: "0",
      borderLeft: "0",
      borderBottom: "4px solid",
      borderColor: "#666699"
    },
    "&:focus": {
      borderTop: "0",
      borderRight: "0",
      borderLeft: "0",
      borderBottom: "4px solid",
      boxShadow: "none"
    }
  },
  website_name: {
    fontFamily: "Verdana",
    flexGrow: "1",
    color: "black",
    fontWeight: "bold",
    fontSize: "2em"
  }
};

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mbool: true,
      border: {
        onglet_visu: true,
        onglet_game: false,
        onglet_chenillard: false,
        onglet_about: false
      }
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar className={classes.toolbar}>
            <IconButton className={classes.menuButton} color="inherit">
              <img src={ghost} alt="ghost_logo" width="64" height="64" />
            </IconButton>
            <p className={classes.website_name}>I love KNX</p>
            <Link to={"/"}>
              <Button
                disableRipple
                variant="outlined"
                color="secondary"
                className={
                  this.state.border.onglet_visu
                    ? classes.bouton_base_clicked
                    : classes.bouton_base
                }
                onClick={() => {
                  this.setState({
                    border: {
                      onglet_visu: true,
                      onglet_game: false,
                      onglet_chenillard: false,
                      onglet_about: false
                    }
                  });
                }}
              >
                Visualisation des lampes
              </Button>
            </Link>

            <Link to={"/games"}>
              <Button
                disableRipple
                variant="outlined"
                color="secondary"
                className={
                  this.state.border.onglet_game
                    ? classes.bouton_base_clicked
                    : classes.bouton_base
                }
                onClick={() => {
                  this.setState({
                    border: {
                      onglet_visu: false,
                      onglet_game: true,
                      onglet_chenillard: false,
                      onglet_about: false
                    }
                  });
                }}
              >
                Accès aux jeux
              </Button>
            </Link>

            <Link to={"/chenillard"}>
              <Button
                disableRipple
                variant="outlined"
                color="secondary"
                className={
                  this.state.border.onglet_chenillard
                    ? classes.bouton_base_clicked
                    : classes.bouton_base
                }
                onClick={() => {
                  this.setState({
                    border: {
                      onglet_visu: false,
                      onglet_game: false,
                      onglet_chenillard: true,
                      onglet_about: false
                    }
                  });
                }}
              >
                Chenillard
              </Button>
            </Link>

            <Link to={"/about"}>
              <Button
                disableRipple
                variant="outlined"
                color="secondary"
                className={
                  this.state.border.onglet_about
                    ? classes.bouton_base_clicked
                    : classes.bouton_base
                }
                onClick={() => {
                  this.setState({
                    border: {
                      onglet_visu: false,
                      onglet_game: false,
                      onglet_chenillard: false,
                      onglet_about: true
                    }
                  });
                }}
              >
                à propos
              </Button>
            </Link>
            <Help
              className={classes.icon}
              onClick={() => {
                this.setState({
                  mbool: !this.state.mbool
                });
              }}
            />
          </Toolbar>
          {this.state.mbool ? (
            <StateMaquette
              information={{
                state_maquette: false,
                state_connection: false,
                address_IP_maquette: "192.168.0.0",
                address_IP_client: "192.168.0.0"
              }}
            />
          ) : (
            <div />
          )}
        </AppBar>
      </div>
    );
  }
}

Topbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Topbar);
