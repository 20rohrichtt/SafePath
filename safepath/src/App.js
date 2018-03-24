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
          <Col md={6}> hi </Col>
          <Col md={6}> hi </Col>
        </Grid>
        <Button> hi </Button>
      </div>
    );
  }
}

export default App;
