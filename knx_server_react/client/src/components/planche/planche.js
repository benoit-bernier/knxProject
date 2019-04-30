import React, { Component } from "react";
import MCard from "./mcard";
import "./planche.css";

class Planche extends Component {
  render() {
    return (
      <div className="planche_container">
        <p className="title_planche">Technologies utilisées dans le projet</p>
        <p className="description_planche">Ensemble des technos</p>
        <div className="cards_container">
          <MCard
            information={{
              title_card: "Je suis un titre",
              image_link:
                "https://s1.qwant.com/thumbr/0x380/9/8/2b28aae526351e89b04248f1eb6bd61e47063f45ea73f35b2a389e4fd3084e/node_js.png?u=http%3A%2F%2Fwww.netgains.org%2Fwp-content%2Fuploads%2F2014%2F01%2Fnode_js.png&q=0&b=1&p=0&a=1",
              image_title: "Titre image",
              text: "Coucou je suis le texte"
            }}
          />
          <MCard
            information={{
              title_card: "Je suis un titre",
              image_link:
                "https://s2.qwant.com/thumbr/0x380/5/b/cec8e1dfb1e2f42dfe86728679e0077b1176bab0a4ce9528dd1443b8ac94e8/1200px-Node.js_logo.svg.png?u=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2Fd%2Fd9%2FNode.js_logo.svg%2F1200px-Node.js_logo.svg.png&q=0&b=1&p=0&a=1",
              image_title: "Titre image",
              text: "Coucou je suis le texte"
            }}
          />
        </div>
      </div>
    );
  }
}

export default Planche;
