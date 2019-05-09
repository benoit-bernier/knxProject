import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import lamp_0 from "./lamp_0.png";
import lamp_1 from "./lamp_1.png";
import { socket } from "../../App";

const styles = {
  root: {
    width: "100%",
    background: "black"
  },
  background_lamp_image: {
    width: "75%",
    background: "black",
    color: "white",
    margin: "auto"
  },
  lamp_image: {
    width: "25%"
  }
};

class LampVisu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [lamp_0, lamp_0, lamp_0, lamp_0]
    };
  }

  componentDidMount = () => {
    socket.on("state_led", data => {
      console.log(data);
      let input = JSON.parse(data);
      try {
        switch (input.cmd) {
          case "state_led_1":
            if (input.data === 0) {
              this.setState({
                images: [
                  lamp_0,
                  this.state.images[1],
                  this.state.images[2],
                  this.state.images[3]
                ]
              });
            } else {
              this.setState({
                images: [
                  lamp_1,
                  this.state.images[1],
                  this.state.images[2],
                  this.state.images[3]
                ]
              });
            }
            break;
          case "state_led_2":
            if (input.data === 0) {
              this.setState({
                images: [
                  this.state.images[0],
                  lamp_0,
                  this.state.images[2],
                  this.state.images[3]
                ]
              });
            } else {
              this.setState({
                images: [
                  this.state.images[0],
                  lamp_1,
                  this.state.images[2],
                  this.state.images[3]
                ]
              });
            }
            break;
          case "state_led_3":
            if (input.data === 0) {
              this.setState({
                images: [
                  this.state.images[0],
                  this.state.images[1],
                  lamp_0,
                  this.state.images[3]
                ]
              });
            } else {
              this.setState({
                images: [
                  this.state.images[0],
                  this.state.images[1],
                  lamp_1,
                  this.state.images[3]
                ]
              });
            }
            break;
          case "state_led_4":
            if (input.data === 0) {
              this.setState({
                images: [
                  this.state.images[0],
                  this.state.images[1],
                  this.state.images[2],
                  lamp_0
                ]
              });
            } else {
              this.setState({
                images: [
                  this.state.images[0],
                  this.state.images[1],
                  this.state.images[2],
                  lamp_1
                ]
              });
            }
            break;
          default:
            console.log("Command not supported..");
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
        <div className={classes.background_lamp_image}>
          <div>
            <img
              src={this.state.images[0]}
              alt="image_lamp_0"
              className={classes.lamp_image}
            />
            <img
              src={this.state.images[1]}
              alt="image_lamp_1"
              className={classes.lamp_image}
            />
            <img
              src={this.state.images[2]}
              alt="image_lamp_2"
              className={classes.lamp_image}
            />
            <img
              src={this.state.images[3]}
              alt="image_lamp_3"
              className={classes.lamp_image}
            />
          </div>
        </div>
      </div>
    );
  }
}

LampVisu.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LampVisu);
