import React, { Component } from "react";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import { VideogameAsset } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

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
    textAlign: "left"
  },
  left_part_description: {
    margin: "10%",
    marginTop: "5%",
    weight: "bold",
    color: "#1c1c1c",
    textAlign: "justify"
  }
};

class Gamedescript extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.left_part}>
          <p className={classes.left_part_title}>Rules :</p>
          <p className={classes.left_part_description}>
            Sin autem ad adulescentiam perduxissent, dirimi tamen interdum
            contentione vel uxoriae condicionis vel commodi alicuius, quod idem
            adipisci uterque non posset. Quod si qui longius in amicitia
            provecti essent, tamen saepe labefactari, si in honoris contentionem
            incidissent; pestem enim nullam maiorem esse amicitiis quam in
            plerisque pecuniae cupiditatem, in optimis quibusque honoris
            certamen et gloriae; ex quo inimicitias maximas saepe inter
            amicissimos exstitisse.
          </p>
          <p className={classes.left_part_title}>Other text :</p>
          <p className={classes.left_part_description}>
            Sin autem ad adulescentiam perduxissent, dirimi tamen interdum
            contentione vel uxoriae condicionis vel commodi alicuius, quod idem
            adipisci uterque non posset. Quod si qui longius in amicitia
            provecti essent, tamen saepe labefactari, si in honoris contentionem
            incidissent; pestem enim nullam maiorem esse amicitiis quam in
            plerisque pecuniae cupiditatem, in optimis quibusque honoris
            certamen et gloriae; ex quo inimicitias maximas saepe inter
            amicissimos exstitisse.
          </p>
        </div>
        <div className={classes.right_part}>
          <Fab
            variant="extended"
            color="secondary"
            className={classes.button_game}
          >
            <VideogameAsset className={classes.icon_play} />
            Play
          </Fab>
        </div>
      </div>
    );
  }
}

Gamedescript.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Gamedescript);
