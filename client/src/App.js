import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar';
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
              <AppNavbar />
        <h1> Hello World! </h1>
      </div>
    );
  }
}

export default App;