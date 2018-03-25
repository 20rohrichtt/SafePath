import React, { Component } from "react";
import GoogleMap from "google-map-react";
import Marker from "./Map/Marker.js";
import blueLights from "./blueLights.js";
class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startLat: null,
      startLong: null,
      endLat: null,
      endLong: null,
      serverResponse: null
    };
  }
  renderPolylines(
    map,
    maps,
    startLat,
    startLong,
    endLat,
    endLong,
    serverResponse
  ) {
    const response = serverResponse;
    console.log(serverResponse);
    const DirectionsService = new maps.DirectionsService();
    const directionsDisplay = new maps.DirectionsRenderer();
    for (var i = 1; i <= 15; i++) {
      var myLatlng = new maps.LatLng(blueLights[i].lat, blueLights[i].lng);
      var marker = new maps.Marker({
        id: i,
        position: myLatlng,
        map: map,
        icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
      });
      marker.setMap(map);
    }
    DirectionsService.route(
      {
        origin: new maps.LatLng(startLat, startLong),
        destination: new maps.LatLng(endLat, endLong),
        travelMode: maps.TravelMode.WALKING,
        provideRouteAlternatives: true
      },
      (result, status) => {
        console.log(response);
        if (status === maps.DirectionsStatus.OK) {
          for (var i = 0; i < result.routes.length; i++) {
            var dr = new maps.DirectionsRenderer();
            dr.setDirections(result);
            dr.setRouteIndex(i);
            dr.setMap(map);
            dr.setOptions({
              polylineOptions: {
                strokeColor: this.handleCrimeDensity(response, i)
              }
            });

            ///Set markers

            if (response) {
              let latMem = [];
              const routeIndex = response[i];
              routeIndex.map(i => {
                const crimes = i.crimes;
                crimes.map(c => {
                  if (!latMem.includes(c.lat)) {
                    latMem.push(c.lat);
                    var myLatlng = new maps.LatLng(c.lat, c.lon);
                    var marker = new maps.Marker({
                      position: myLatlng,
                      map: map,
                      label: c.type
                    });
                    marker.setMap(map);
                  }
                });
              });
            }
          }
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }
  componentWillReceiveProps(n) {
    this.setState({
      startLat: n.startLat,
      startLong: n.startLong,
      endLat: n.endLat,
      endLong: n.endLong,
      serverResponse: n.serverResponse
    });
  }
  handleCrimeDensity = (response, i) => {
    if (!response) {
      return "black";
    } else {
      if (response[i]) {
        const route = response[i];
        let amount = 0;
        route.map(r => {
          amount += r.crimes.length;
        });
        console.log(amount);
        if (amount <= 8) {
          return "green";
        } else if (amount < 16) {
          return "yellow";
        } else if (amount < 24) {
          return "orange";
        } else {
          return "red";
        }
      }
    }
  };
  render() {
    if (this.props.loading) {
      return <div />;
    } else {
      {
        console.log(blueLights);
      }
      return (
        <GoogleMap
          key={this.state.endLat + this.state.startLat}
          bootstrapURLKeys={{ key: "AIzaSyA0XKCIPo3ew_uNf3qPTHIMfbfF4o6CQkA" }}
          style={{ height: "100vh", width: "100%" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) =>
            this.renderPolylines(
              map,
              maps,
              this.state.startLat,
              this.state.startLong,
              this.state.endLat,
              this.state.endLong,
              this.state.serverResponse
            )
          }
        />
      );
    }
  }
}

export default Map;
