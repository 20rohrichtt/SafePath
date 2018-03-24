import React, { Component } from "react";
import GoogleMap from "google-map-react";
import Marker from "./Map/Marker.js";

class Map extends Component {
  renderPolylines(map, maps) {
    const p = this.props.paths;
    console.log(p);
    const DirectionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();

    DirectionsService.route(
      {
        origin: new maps.LatLng(p.start.lat, p.start.lng),
        destination: new maps.LatLng(p.end.lat, p.end.lng),
        travelMode: maps.TravelMode.WALKING,
        provideRouteAlternatives: true
      },
      (result, status) => {
        if (status === maps.DirectionsStatus.OK) {
          for (var i = 0; i < result.routes.length; i++) {
            var dr = new maps.DirectionsRenderer();
            console.log(result);
            dr.setDirections(result);
            dr.setRouteIndex(i);
            dr.setMap(map);
            dr.setOptions({
              polylineOptions: {
                strokeColor: this.handleCrimeDensity(i)
              }
            });
            // Tell the DirectionsRenderer which route to display
            //dr.setRouteIndex(i);
            //dr.setMap(map);

            // Code ommited to display distance and duration
          }
          //directionsDisplay.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  handleCrimeDensity = i => {
    if (i % 2) {
      return "red";
    } else {
      return "green";
    }
  };
  render() {
    return (
      <GoogleMap
        bootstrapURLKeys={{ key: "AIzaSyA0XKCIPo3ew_uNf3qPTHIMfbfF4o6CQkA" }}
        style={{ height: "100vh", width: "100%" }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => this.renderPolylines(map, maps)}
      />
    );
  }
}

export default Map;
