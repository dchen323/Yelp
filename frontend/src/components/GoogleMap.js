import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };

    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.coordinates) {
      const { latitude, longitude } = prevProps.coordinates;
      const lat = this.props.coordinates.latitude;
      const lng = this.props.coordinates.longitude;

      if (lat !== latitude || longitude !== lng) {
        this.onClose();
      }
    }
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  onClose(props) {
    this.setState({ showingInfoWindow: false, activeMarker: null });
  }

  render() {
    const { lat, lng } = this.props;
    let markerLat, markerLng;
    if (this.props.coordinates) {
      markerLng = this.props.coordinates.longitude;
      markerLat = this.props.coordinates.latitude;
    }
    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          zoom={this.props.zoom}
          center={{
            lat,
            lng
          }}
          className="map"
        >
          <Marker
            position={{ lat, lng }}
            name={"Current Location"}
            onClick={this.onMarkerClick}
          />
          <Marker
            position={{ lat: markerLat, lng: markerLng }}
            name={this.props.name}
            onClick={this.onMarkerClick}
          />
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onClose}
          >
            <div>
              <h5>{this.state.selectedPlace.name}</h5>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEMAP_API_KEY
})(MapContainer);
