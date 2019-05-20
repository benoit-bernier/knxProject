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

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      button_1: 0,
      button_2: 0,
      button_3: 0,
      button_4: 0,
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
          case "verify_order":
            console.log(data);
            let clear = true;
            for (let i = 0; i < input.data.length; i++) {
              if (input.data[i] === 0) {
                clear = false;
              }
            }
            if (clear) {
              this.stop();
              this.handleClickOpen();
              console.log("Vous avez gagné !");
            }
            break;
          default:
          //console.log("Command not supported..");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  componentWillUnmount = () => {
    this.stop();
  };

  up_button_1 = () => {
    let temp = (this.state.button_1 + 1) % 4;
    this.setState({ button_1: temp });
  };

  up_button_2 = () => {
    let temp = (this.state.button_2 + 1) % 4;
    this.setState({ button_2: temp });
  };

  up_button_3 = () => {
    let temp = (this.state.button_3 + 1) % 4;
    this.setState({ button_3: temp });
  };

  up_button_4 = () => {
    let temp = (this.state.button_4 + 1) % 4;
    this.setState({ button_4: temp });
  };

  reset_count = () => {
    this.setState({ count: 0 });
  };

  count = () => {
    let temp = this.state.count + 1;
    this.setState({ count: temp });
  };

  init_reset = () => {
    let myObj = {
      cmd: "INIT"
    };
    let myJSON = JSON.stringify(myObj);
    socket.emit("order", myJSON);
    this.reset_count();
    console.log("Init / Reset");
  };

  verify = () => {
    let myObj = {
      cmd: "VERIFY",
      data: [
        this.state.button_1,
        this.state.button_2,
        this.state.button_3,
        this.state.button_4
      ]
    };
    let myJSON = JSON.stringify(myObj);
    socket.emit("order", myJSON);
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
                {"Bravo ! Vous avez gagné en " + this.state.count + " coups !"}
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
              Init / Reset order
            </Fab>
            <Fab
              variant="extended"
              className={classes.button_lancement}
              color="primary"
              onClick={this.stop}
            >
              Stop order
            </Fab>
          </div>
          <div className={classes.windows}>
            <Fab
              variant="extended"
              color="secondary"
              onClick={this.up_button_1}
              className={classes.button}
            >
              {this.state.button_1}
            </Fab>
            <Fab
              variant="extended"
              color="secondary"
              onClick={this.up_button_2}
              className={classes.button}
            >
              {this.state.button_2}
            </Fab>
            <Fab
              variant="extended"
              color="secondary"
              onClick={this.up_button_3}
              className={classes.button}
            >
              {this.state.button_3}
            </Fab>
            <Fab
              variant="extended"
              color="secondary"
              onClick={this.up_button_4}
              className={classes.button}
            >
              {this.state.button_4}
            </Fab>
            <Fab
              variant="extended"
              color="primary"
              className={classes.button_lancement}
              onClick={() => {
                this.verify();
                this.count();
              }}
            >
              Vérification
            </Fab>
          </div>
        </div>
      </div>
    );
  }
}

Order.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Order);
