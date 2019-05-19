import React, { Component } from "react";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import { VideogameAsset } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import { Games } from "@material-ui/icons";
import { QuestionAnswer } from "@material-ui/icons";
import red from "@material-ui/core/colors/red";
import { Link } from "react-router-dom";

const Red = red[600];

const styles = {
  root: {
    margin: 0,
    width: "100%",
    height: "100%",
    display: "flex"
  },
  icon_play: {
    marginRight: "10px",
    height: "1.5em",
    width: "auto"
  },
  button_game: {
    fontSize: "1.5em",
    width: "50%",
    height: "15%"
  },
  left_part: {
    width: "50%",
    background: "white",
    textAlign: "center",
    color: "grey"
  },
  right_part: {
    display: "inline-block",
    width: "50%",
    background: "#1c1c1c",
    textAlign: "center",
    verticalAlign: "middle",
    lineHeight: "600px"
  },
  left_part_title: {
    margin: "10%",
    marginBottom: "5%",
    weight: "bold",
    fontSize: "2em",
    color: "#1c1c1c",
    textAlign: "left",
    fontWeight: "bold",
    borderBottom: "3px solid grey",
    height: "35px"
  },
  left_part_description: {
    margin: "10%",
    marginTop: "5%",
    marginBottom: "5%",
    weight: "bold",
    color: "#1c1c1c",
    textAlign: "justify",
    fontSize: "1.3em"
  },
  icon: {
    fontSize: 30,
    marginRight: "40px",
    verticalAlign: "middle",
    color: Red
  },
  line_gamedescript: {
    border: "0",
    height: "0",
    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    borderBottom: "border-bottom: 1px solid rgba(255, 255, 255, 0.3)"
  }
};

class Gamedescript extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: props.description || {
        title: "",
        description_title: "",
        title_2: "",
        description_title_2: ""
      }
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.left_part}>
          <p className={classes.left_part_title}>
            <QuestionAnswer className={classes.icon} />
            {this.state.description.title}
          </p>
          <p className={classes.left_part_description}>
            {this.state.description.description_title}
          </p>
          <hr className={classes.line_gamedescript} />
          <p className={classes.left_part_title}>
            <Games className={classes.icon} />
            {this.state.description.title_2}
          </p>
          <p className={classes.left_part_description}>
            {this.state.description.description_title_2}
          </p>
        </div>
        <div className={classes.right_part}>
          <Link to={"/mastermind"}>
            <Fab
              variant="extended"
              color="secondary"
              className={classes.button_game}
            >
              <VideogameAsset className={classes.icon_play} />
              Play
            </Fab>
          </Link>
        </div>
      </div>
    );
  }
}

Gamedescript.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Gamedescript);
