import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    flexGrow: 1,
    display: "inline-block",
    width: 300,
    height: 300
  },
  media: {
    height: 200
  },
  image: {
    height: 150,
    width: 150
  }
};

class MCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      information: props.information
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.image}
            image={this.state.information.image_link}
            title={this.state.information.image_title}
          />
          <CardContent className={classes.media}>
            <Typography gutterBottom variant="h5" component="h2">
              {this.state.information.title_card}
            </Typography>
            <Typography component="p">{this.state.information.text}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions />
      </Card>
    );
  }
}

MCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MCard);
