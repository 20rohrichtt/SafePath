import React, { Component } from "react";
import logo from "./logo.svg";

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
            origin: "",
            destination: ""
        };
    }

    handleOriginChange(e) {
        this.setState({
            ...this.state,
            origin: e.target.value
        })
    }

    handleDropDownChange() {
        this.setState({
            ...this.state,
            showDropdown: !this.state.showDropdown
        })
    }

    handleDestinationChange(e) {
        this.setState({
            ...this.state,
            destination: e.target.value
        })
    }

    handleDirectionsSubmit() {
        // send stuff
        this.setState({
            ...this.state,
            showDropdown: false
        })
    }
    render() {
        return(
            <Grid style = {styles.grid}>
            
              {this.state.showDropdown ?
               <Form>
                <Row style = {styles.row}>
                   
                    <Button bsStyle="primary" onClick = {() => this.handleDropDownChange()} block> Find my path
                    </Button>
                </Row>
                <Row style = {styles.row}>
                    <FormControl
                        style = {{padding: 20}}
                        bsSize = "lg"
                        type="text"
                        value={this.state.origin}
                        placeholder="Enter starting point"
                        onChange={(e) => this.handleOriginChange(e)}
                    />
                </Row>
                <Row style = {styles.row}>
                    <FormControl
                        style = {{padding: 20}}
                        bsSize = "lg"
                        type="text"
                        value={this.state.destination}
                        placeholder="Enter destination"
                        onChange={(e) => this.handleDestinationChange(e)}
                    />
                </Row>
                <Row style = {styles.row}>
                    <Button bsStyle = "success" onClick = {() => this.handleDirectionsSubmit()} block> Submit</Button>
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