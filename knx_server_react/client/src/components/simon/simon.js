import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import { socket } from "../../App";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";

const styles = {
  root: {
    margin: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    background: "#1C1C1C"
  },
  windows: {
    margin: 0,
    width: "100%",
    height: "450px",
    background: "#1C1C1C",
    marginTop: "40px"
  },
  title: {
    margin: 0,
    lineHeight: "100px",
    fontSize: "1.5em",
    color: "white",
    background: "#1C1C1C"
  },
  button: {
    fontSize: "1.5em",
    width: "120px",
    height: "120px",
    marginTop: "20px",
    marginLeft: "20px",
    marginRight: "20px"
  },
  button_lancement: {
    fontSize: "1.5em",
    width: "400px",
    height: "120px",
    marginTop: "20px",
    marginLeft: "120px",
    marginRight: "20px"
  }
};

class Simon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: [],
      open: false,
      count: 0
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.stop();
  };

  componentDidMount = () => {
    socket.on("game", data => {
      let input = JSON.parse(data);
      try {
        switch (input.cmd) {
          case "verify_simon":
            console.log(data);
            if (!input.data) {
              this.stop();
              this.handleClickOpen();
              console.log("Partie terminée !");
            } else {
              this.count();
            }
            break;
          default:
            console.log("Command not supported.. Message : " + input);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  componentWillUnmount = () => {
    this.stop();
  };

  count = () => {
    let temp = this.state.count + 1;
    this.setState({ count: temp });
  };

  up_button_1 = () => {
    let temp = this.state.tab;
    temp.push(1);
    this.setState({ tab: temp });
    console.log(this.state.tab);
  };

  up_button_2 = () => {
    let temp = this.state.tab;
    temp.push(2);
    this.setState({ tab: temp });
    console.log(this.state.tab);
  };

  up_button_3 = () => {
    let temp = this.state.tab;
    temp.push(3);
    this.setState({ tab: temp });
    console.log(this.state.tab);
  };

  up_button_4 = () => {
    let temp = this.state.tab;
    temp.push(4);
    this.setState({ tab: temp });
    console.log(this.state.tab);
  };

  init_reset = () => {
    let myObj = {
      cmd: "INIT"
    };
    let myJSON = JSON.stringify(myObj);
    socket.emit("simon", myJSON);
    this.setState({ tab: [] });
    console.log("Init / Reset");
  };

  verify = () => {
    let myObj = {
      cmd: "VERIFY",
      data: this.state.tab
    };
    let myJSON = JSON.stringify(myObj);
    socket.emit("simon", myJSON);
    this.setState({ tab: [] });
    console.log("VERIFY : " + myObj.data);
  };

  stop = () => {
    let myObj = {
      cmd: "STOP"
    };
    let myJSON = JSON.stringify(myObj);
    socket.emit("order", myJSON);
    console.log("STOP");
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.root}>
          <div>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Bravo ! Vous avez réussi à reproduire " +
                  this.state.count +
                  " symbole(s) !"}
              </DialogTitle>
              <DialogContent />
              <DialogActions>
                <Link to={"/games"}>
                  <Button onClick={this.handleClose} color="primary" autoFocus>
                    Retour au menu
                  </Button>
                </Link>
              </DialogActions>
            </Dialog>
          </div>
          <div className={classes.windows}>
            <Fab
              variant="extended"
              className={classes.button_lancement}
              color="primary"
              onClick={this.init_reset}
            >
              Init / Reset Simon
            </Fab>
            <Fab
              variant="extended"
              className={classes.button_lancement}
              color="primary"
              onClick={this.stop}
            >
              Stop Simon
            </Fab>
          </div>
          <div className={classes.windows}>
            <Fab
              variant="extended"
              color="secondary"
              className={classes.button}
              onClick={this.up_button_1}
            >
              LED 1
            </Fab>
            <Fab
              variant="extended"
              color="secondary"
              className={classes.button}
              onClick={this.up_button_2}
            >
              LED 2
            </Fab>
            <Fab
              variant="extended"
              color="secondary"
              className={classes.button}
              onClick={this.up_button_3}
            >
              LED 3
            </Fab>
            <Fab
              variant="extended"
              color="secondary"
              className={classes.button}
              onClick={this.up_button_4}
            >
              LED 4
            </Fab>
            <Fab
              variant="extended"
              className={classes.button_lancement}
              color="primary"
              onClick={this.verify}
            >
              Vérification
            </Fab>
          </div>
        </div>
      </div>
    );
  }
}

Simon.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Simon);
