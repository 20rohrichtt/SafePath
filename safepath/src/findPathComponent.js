import React, { Component } from "react";
import logo from "./logo.svg";
import PlacesAutocomplete, { geocodeByAddress, getLatLng, geocodeByPlaceId} from 'react-places-autocomplete';

import {
  FormGroup,
  FormControl,
  Form,
  Grid,
  Row,
  Col,
  Button,
  ButtonToolbar,
  PageHeader
} from "react-bootstrap";

import "./findPathComponent.css";

export default class findPathComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false,
            startAddress: "Start",
            endAddress: "End",
            
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
        const startInputProps = {
            value: this.state.startAddress,
            onChange: this.onStartChange,
          }
          const endInputProps = {
            value: this.state.endAddress,
            onChange: this.onEndChange,
          }
        return(
            <Grid style = {styles.grid}>
            
              {this.state.showDropdown ?
               <Form>
                <Row style = {styles.row}>
                   
                    <Button bsStyle="primary" onClick = {() => this.handleDropDownChange()} block> Find my path
                    </Button>
                </Row>
                <Row style = {styles.row}>
                     <PlacesAutocomplete inputProps={startInputProps} />
                </Row>
                <Row style = {styles.row}>
                    <PlacesAutocomplete inputProps={endInputProps} />
                </Row>
                <Row style = {styles.row}>
                    <Button bsStyle = "success" onClick = {this.handleFormSubmit} block> Submit</Button>
                </Row>
                    <FormControl.Feedback />
                </Form>
                
            : 
            <Row style = {styles.row}>
                <Button bsStyle="primary" onClick = {() => this.handleDropDownChange()} block> Find my path
                </Button></Row>}
            </Grid>
        )
    }
};
const styles = {
    grid: {
        paddingLeft: 8,
        paddingRight: 8,
    },
    row: {
        padding: 8,
        paddingLeft:16,
        paddingRight: 16
     
    },
    col: {
        paddingLeft: 8,
        paddingRight: 8
    }
};