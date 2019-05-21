import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import StateMaquette from "../state_maquette/state_maquette";
import red from "@material-ui/core/colors/red";
import logo from "./logo.png";
import { Done } from "@material-ui/icons";
import { HighlightOff } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { socket } from "../../App";

const styles = {
  root: {
    flexGrow: 1
  },
  toolbar: {
    height: "140px"
  },
  icon: {
    fontSize: 30,
    "&:hover": {
      color: red[400]
    }
  },
  bouton_logo: {
    borderTop: "0",
    borderRight: "0",
    borderLeft: "0",
    borderBottom: "0",
    boxShadow: "none",
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
      border: "0"
    },
    "&:focus": {
      boxShadow: "none"
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
    borderLeft: "100px",
    fontFamily: "Verdana",
    flexGrow: "1",
    color: "black",
    fontWeight: "bold",
    fontSize: "2em"
  },
  logo: {
    border: "0",
    color: "white",
    background: "white",
    marginLeft: "20px",
    width: "300px",
    height: "100px",
    "&:hover": {
      border: "0",
      color: "blue"
    },
    "&:active": {
      border: "0",
      color: "white"
    },
    "&:focus": {
      border: "0",
      color: "white"
    }
  },
  connect_green: {
    color: "green"
  },
  connect_red: {
    color: "red"
  }
};

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      border: {
        onglet_visu: true,
        onglet_game: false,
        onglet_chenillard: false,
        onglet_about: false,
        connect: false
      }
    };
  }

  connection = () => {
    let myObj = {
      cmd: "CONNECT"
    };
    let myJSON = JSON.stringify(myObj);
    console.log(myJSON);
    socket.emit("events", myJSON);
  };

  disconnection = () => {
    let myObj = {
      cmd: "DISCONNECT"
    };
    let myJSON = JSON.stringify(myObj);
    console.log(myJSON);
    socket.emit("events", myJSON);
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="inherit">
          <Toolbar className={classes.toolbar}>
            <Link to={"/"}>
              <Button
                disableRipple
                variant="outlined"
                color="secondary"
                className={classes.bouton_logo}
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
                <img src={logo} alt="logo" />
              </Button>
            </Link>
            <p className={classes.website_name}> </p>
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
            <Button>
              <Done
                className={classes.connect_green}
                onClick={this.connection}
              />
            </Button>
            <Button>
              <HighlightOff
                className={classes.connect_red}
                onClick={this.disconnection}
              />
            </Button>
          </Toolbar>
          <StateMaquette />
        </AppBar>
      </div>
    );
  }
}

Topbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Topbar);
