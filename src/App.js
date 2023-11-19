import { Component } from "react";
import Welcome from "./components/WelcomeRoute";

import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <Welcome />
      </div>
    );
  }
}

export default App;
