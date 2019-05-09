import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Pic_Ber from "./avatar_ber.svg";
import Pic_Bla from "./avatar_bla.svg";
import Pic_React from "./react.png";
import Pic_Node from "./nodejs.png";
import Pic_Flutter from "./flutter.png";
import Pic_KNX from "./knx.png";
import Pic_Socketio from "./socketio.png";
import Pic_NPM from "./npm.png";

const styles = {
  root: {
    margin: 0
  },
  windows: {
    margin: 0,
    alignItems: "center",
    textAlign: "center"
  },
  description: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "20%",
    width: "60%",
    marginTop: "50px",
    marginBottom: "50px"
  },
  description_techno: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: "50px",
    marginBottom: "50px"
  },
  content: {
    width: "50%",
    alignItems: "center",
    textAlign: "center"
  },
  content_techno: {
    width: "33.33%",
    alignItems: "center",
    textAlign: "center"
  },
  image: {
    width: "200px",
    marginTop: "20px"
  },
  text: {
    fontWeight: "bold",
    fontSize: "1.2em"
  },
  title: {
    margin: 0,
    lineHeight: "100px",
    background: "#A7B8D4",
    fontWeight: "bold",
    color: "white",
    fontSize: "3em"
  }
};

class About extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.windows}>
          <h1 className={classes.title}> Membres de l'équipe-projet</h1>
          <div className={classes.description}>
            <div className={classes.content}>
              <img src={Pic_Ber} alt="avatar_ber" className={classes.image} />
              <p className={classes.text}>Tatabernier </p>
            </div>
            <div className={classes.content}>
              <img src={Pic_Bla} alt="avatar_bla" className={classes.image} />
              <p className={classes.text}>Blandela</p>
            </div>
          </div>
          <div className={classes.windows}>
            <h1 className={classes.title}> Technologies utilisées</h1>
            <div className={classes.description_techno}>
              <div className={classes.content_techno}>
                <img src={Pic_Node} alt="Pic_Node" className={classes.image} />
                <p className={classes.text}>Node.js</p>
              </div>
              <div className={classes.content_techno}>
                <img src={Pic_NPM} alt="Pic_NPM" className={classes.image} />
                <p className={classes.text}>Librairie KNXnet/IP</p>
              </div>
              <div className={classes.content_techno}>
                <img
                  src={Pic_Flutter}
                  alt="Pic_Flutter"
                  className={classes.image}
                />
                <p className={classes.text}>Flutter</p>
              </div>
              <div className={classes.content_techno}>
                <img
                  src={Pic_React}
                  alt="Pic_React"
                  className={classes.image}
                />
                <p className={classes.text}>React</p>
              </div>
              <div className={classes.content_techno}>
                <img
                  src={Pic_Socketio}
                  alt="Pic_Socketio"
                  className={classes.image}
                />
                <p className={classes.text}>Socket.io</p>
              </div>
              <div className={classes.content_techno}>
                <img src={Pic_KNX} alt="Pic_KNX" className={classes.image} />
                <p className={classes.text}>Protocole KNX</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

About.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(About);
