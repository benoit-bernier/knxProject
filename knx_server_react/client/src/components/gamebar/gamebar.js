import React from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Gamedescript from "./gamedescript";

function TabContainer(props) {
  const { children, dir } = props;

  return (
    <Typography component="div" dir={dir} style={{ padding: 0 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: "theme.palette.background.paper",
    width: "100%",
    position: "relative",
    minHeight: 200
  },
  fab: {
    position: "absolute"
  }
});

class Gamebar extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab label="Order" />
            <Tab label="Simon" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <Gamedescript
              description={{
                title: "Description du jeu",
                description_title:
                  "Le Order est un jeu très simple à appréhender (mais aussi à maitriser). Le but du jeu est de trouver l'ordre d'affichage des LED déterminé par une IA (IA fortement inspiré du génie Pierre-Damien travaillant sur un arroseur automatique intelligent). Après chaque tentative, le serveur vous affichera sur la maquette les LED bien placées.",
                title_2: "Comment jouer !",
                description_title_2:
                  "Entrer les positions des LED dans la pop-up puis regarder l'affichage des LED ! Utilisé toute votre matière grise non grillé par la SCP pour chercher le bon ordre des LED ! Indication : une LED bien placée reste allumé plus longtemps qu'une LED mal placé ! "
              }}
            />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Gamedescript
              description={{
                title: "Description du jeu",
                description_title:
                  "Le Simon est un jeu très simple à appréhender (mais très dur à maitriser). Utiliser votre brain pour repoduire le schéma projeté sur les LED de la maquette. Pour gagner, reproduiser à l'identique le schéma grâce à l'interface !",
                title_2: "Comment jouer !",
                description_title_2:
                  "Appuyer sur les boutons pour reproduire le motif proposé par l'IA (IA fortement inspiré du génie Pierre-Damien travaillant sur un arroseur automatique intelligent). Attention ! Vous devez reproduire le schéma en suivant l'ordre d'allumage des LED."
              }}
            />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

Gamebar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Gamebar);
