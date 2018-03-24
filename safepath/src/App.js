import React, { Component } from "react";
import logo from "./logo.svg";
import FindPathComponent from './findPathComponent';
import {
  FormGroup,
  FormControl,
  Grid,
  Row,
  Col,
  Button,
  ButtonToolbar,
  PageHeader
} from "react-bootstrap";

import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
         <PageHeader>
          <h1 className="App-title">SafePath</h1>
        </PageHeader>
     
          <FindPathComponent />
 
      </div>
    );
  }
}

export default App;
