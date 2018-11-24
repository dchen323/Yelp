import React, { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%"
};

export class MapContainer extends Component {
  render() {
    const { lat, lng } = this.props;
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{ lat, lng }}
      />
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyAPjYkDq0-iiCd6W5-qCw46J-r0EW39L1U"
})(MapContainer);
