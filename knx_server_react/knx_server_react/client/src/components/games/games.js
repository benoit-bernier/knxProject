import React, { Component } from "react";
import Gamebar from "../gamebar/gamebar";

class Game extends Component {
  render() {
    return (
      <div>
        <Gamebar
          links={[
            { link: "/customers", name: "Page des customers" },
            {
              link: "/shoppinglist",
              name: "Page du shopping"
            },
            {
              link: "/lamp_visu",
              name: "Visualisation des lampes"
            }
          ]}
        />
      </div>
    );
  }
}

export default Game;
