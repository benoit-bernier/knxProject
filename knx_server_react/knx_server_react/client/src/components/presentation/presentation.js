import React, { Component } from "react";
import "./presentation.css";

class Presentation extends Component {
  render() {
    return (
      <div className="presentation_background">
        <p className="text_description">Présentation du projet</p>
        <p className="text_description_legend">Réalisé en 2019</p>
      </div>
    );
  }
}

export default Presentation;
