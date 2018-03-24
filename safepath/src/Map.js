import React, { Component } from "react";
import GoogleMap from "google-map-react";
import Marker from "./Map/Marker.js";

class Map extends Component {
  renderPolylines(map, maps) {
    const { startLat, startLong, endLat, endLong } = this.props;
    const DirectionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();
    var myLatlng = new maps.LatLng(startLat, startLong);
    var marker = new maps.Marker({
      position: myLatlng,
      map: map,
      title: "Hello World!"
    });
    marker.setMap(map);
    DirectionsService.route(
      {
        origin: new maps.LatLng(startLat, startLong),
        destination: new maps.LatLng(endLat, endLong),
        travelMode: maps.TravelMode.WALKING,
        provideRouteAlternatives: true
      },
      (result, status) => {
        if (status === maps.DirectionsStatus.OK) {
          for (var i = 0; i < result.routes.length; i++) {
            var dr = new maps.DirectionsRenderer();
            dr.setDirections(result);
            dr.setRouteIndex(i);
            dr.setMap(map);
            dr.setOptions({
              polylineOptions: {
                strokeColor: this.handleCrimeDensity(i)
              }
            });
          }
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
