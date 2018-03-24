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
    }
    render() {
        const startInputProps = {
            value: this.props.startAddress,
            onChange: this.props.onStartChange,
          }
          const endInputProps = {
            value: this.props.endAddress,
            onChange: this.props.onEndChange,
          }
        return(
            <Grid style = {styles.grid}>
            
              {this.props.showDropdown ?
               <Form>
                <Row style = {styles.row}>
                   
                    <Button bsStyle="primary" onClick = {this.props.handleDropDownChange} block> Find my path
                    </Button>
                </Row>
                <Row style = {styles.row}>
                     <PlacesAutocomplete inputProps={startInputProps} />
                </Row>
                <Row style = {styles.row}>
                    <PlacesAutocomplete inputProps={endInputProps} />
                </Row>
                <Row style = {styles.row}>
                    <Button bsStyle = "success" onClick = {this.props.handleFormSubmit} block> Submit</Button>
                </Row>
                    <FormControl.Feedback />
                </Form>
                
            : 
            <Row style = {styles.row}>
                <Button bsStyle="primary" onClick = {this.props.handleDropDownChange} block> Find my path
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