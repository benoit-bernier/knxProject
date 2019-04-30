import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import lamp_0 from "./lamp_0.png";
import lamp_1 from "./lamp_1.png";

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
      images: [lamp_0, lamp_1, lamp_0, lamp_0],
      mInterval: ""
    };
  }

  componentDidMount() {
    function shuffle(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    }
    this.setState({
      mInterval: setInterval(() => {
        this.setState({ images: shuffle(this.state.images) });
      }, 2000)
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.mInterval);
  }

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
