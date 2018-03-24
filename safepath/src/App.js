import React, { Component } from "react";
import logo from "./logo.svg";
import FindPathComponent from "./findPathComponent";
import Map from "./Map.js";
import PlacesAutocomplete, { geocodeByAddress, getLatLng, geocodeByPlaceId} from 'react-places-autocomplete';

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
      paths: {
        start: { lat: 38.0314266, lng: -78.5029496 },
        end: { lat: 38.0409229, lng: -78.49572119 }
      }
    };
    this.onStartChange = (address) => this.setState({ ...this.state, startAddress: address })
    this.onEndChange = (address) => this.setState({ ...this.state, endAddress: address })
  }

  handleDropDownChange() {
    this.setState({
        ...this.state,
        showDropdown: !this.state.showDropdown
    })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.startAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success for start point', latLng))
      .catch(error => console.error('Error', error))
    
    geocodeByAddress(this.state.endAddress)
      .then(results => getLatLng(results[0]))
      .then(latlng => console.log('Success for end point', latlng))
      .catch(error => console.log('Error', error))
  }


  render() {
    return (
      <div className="App">
        <div className="PageHeader">
          <PageHeader>
            <h1 className="App-title">SafePath</h1>
          </PageHeader>
          <FindPathComponent 
              showDropdown = {this.state.showDropdown}
              startAddress = {this.state.startAddress}
              endAddress =  {this.state.endAddress}
              onStartChange = {this.onStartChange}
              onEndChange = {this.onEndChange}
              handleFormSubmit = {this.handleFormSubmit}
              handleDropDownChange = {() => this.handleDropDownChange()}/>
        </div>
        <Map
          className="Map"
          center={[38.0293, 78.4767]}
          zoom={4}
          paths={this.state.paths}
        />
      </div>
    );
  }
}

export default App;
