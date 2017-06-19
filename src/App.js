import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Store from "./store/Store";

import PickContainer from "./PickContainer";
import CityWalkContainer from "./CityWalkContainer";

import "./style/core.css";
import "./style/typography.css";
import "./style/map.css";
import "./style/ui.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      store: new Store()
    };
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Route exact path="/" render={() => <PickContainer />} />
          <Route
            path="/citywalk/:lat/:lng/:visit/:time"
            render={routeProps =>
              <CityWalkContainer
                params={routeProps.match.params}
                store={this.state.store}
              />}
          />
        </div>
      </Router>
    );
  }
}

export default App;
