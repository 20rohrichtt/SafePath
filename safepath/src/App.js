import React, { Component } from "react";
import logo from "./logo.svg";

import {
  FormGroup,
  FormControl,
  Grid,
  Row,
  Col,
  Button
} from "react-bootstrap";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Grid>
          <Col md={6}> hid </Col>
          <Col md={6}> hi </Col>
        </Grid>
        <Button> hi </Button>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
