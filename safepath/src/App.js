import React, { Component } from "react";
import logo from "./logo.svg";
import Map from "./Map.js";
import {
  FormGroup,
  FormControl,
  Grid,
  Row,
  Col,
  Button
} from "react-bootstrap";

import "./App.css";

const apiKey = "AIzaSyA0XKCIPo3ew_uNf3qPTHIMfbfF4o6CQkA";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paths: {
        start: { lat: 38.0314266, lng: -78.5029496 },
        end: { lat: 38.0409229, lng: -78.49572119 }
      }
    };
  }
  render() {
    return (
      <div className="App">
        <Map center={[38.0293, 78.4767]} zoom={4} paths={this.state.paths} />
      </div>
    );
  }
}

export default App;
