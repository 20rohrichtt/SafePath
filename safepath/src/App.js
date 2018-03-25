import React, { Component } from "react";
import logo from "./logo.svg";
import FindPathComponent from "./findPathComponent";
import Map from "./Map.js";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
  geocodeByPlaceId
} from "react-places-autocomplete";
import axios from "axios";
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

const apiKey = "AIzaSyA0XKCIPo3ew_uNf3qPTHIMfbfF4o6CQkA";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDropdown: false,
      startAddress: "start",
      endAddress: "end",
      startLat: null,
      startLong: null,
      endLat: null,
      endLong: null,
      serverResponse: null
    };

    this.onStartChange = address => {
      console.log(address);
      if (address == "start") {
        this.setState({ ...this.state, startAddress: address });
      }
      this.setState({ ...this.state, startAddress: address });
    };
    this.onEndChange = address =>
      this.setState({ ...this.state, endAddress: address });
  }

  handleDropDownChange() {
    this.setState({
      ...this.state,
      showDropdown: !this.state.showDropdown
    });
  }

  handleFormSubmit = event => {
    event.preventDefault();
    geocodeByAddress(this.state.startAddress)
      .then(results => getLatLng(results[0]))
      .then(latlngStart => {
        geocodeByAddress(this.state.endAddress)
          .then(results => getLatLng(results[0]))
          .then(latlngEnd => {
            console.log(latlngEnd);
            const url =
              "https://us-central1-safepath-1521912285652.cloudfunctions.net/getDirections?start=" +
              latlngStart.lat +
              "," +
              latlngStart.lng +
              "&end=" +
              latlngEnd.lat +
              "," +
              latlngEnd.lng;
            console.log(url);
            axios.get(url).then(response => {
              if (response.data) {
                this.setState({
                  startLat: latlngStart.lat,
                  startLong: latlngStart.lng,
                  endLat: latlngEnd.lat,
                  endLong: latlngEnd.lng,
                  serverResponse: response.data
                });
              } else {
                alert("error has occured");
              }
            });
          })
          .catch(error => console.log("Error", error));
      })
      .catch(error => console.error("Error", error));
  };

  render() {
    return (
      <div className="App">
        {console.log(this.state)}
        <div className="PageHeader">
          <PageHeader>
            <h1 className="App-title">SafePath</h1>
          </PageHeader>
          <FindPathComponent
            showDropdown={this.state.showDropdown}
            startAddress={this.state.startAddress}
            endAddress={this.state.endAddress}
            onStartChange={this.onStartChange}
            onEndChange={this.onEndChange}
            handleFormSubmit={this.handleFormSubmit}
            handleDropDownChange={() => this.handleDropDownChange()}
          />
        </div>
        <Map
          className="Map"
          center={[38.0293, -78.4767]}
          zoom={10}
          startLat={this.state.startLat}
          startLong={this.state.startLong}
          endLat={this.state.endLat}
          endLong={this.state.endLong}
          serverResponse={this.state.serverResponse}
        />
      </div>
    );
  }
}

export default App;
