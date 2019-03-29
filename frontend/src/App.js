import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import Store from "./components/Store";
import SearchBar from "./components/SearchBar";
import NavBar from "./components/NavBar";
import GoogleMap from "./components/GoogleMap";

class App extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      results: {},
      errors: "",
      zoom: 13,
      count: 0
    };
    this.search = this.search.bind(this);
    this.getNext = this.getNext.bind(this);
  }

  componentDidMount() {
    if (navigator.geolocation) {
      this.watchId = navigator.geolocation.watchPosition(data => {
        const latitude = data.coords.latitude;
        const longitude = data.coords.longitude;
        this.setState({
          latitude,
          longitude
        });
      });
    }
  }

  search(query) {
    if (query.length === 0) {
      return;
    }
    axios
      .get("/api/search/", {
        params: {
          term: query,
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          open_now: true
        }
      })
      .then(res => {
        const results = JSON.parse(res.data.response).businesses.filter(
          business => business.distance <= 2400
        );
        if (results.length === 0) {
          this.setState({
            errors:
              "Sorry could not find any results try a broader search term!"
          });
        } else {
          const zoom = results[0].distance > 1600 ? 12 : 13;
          this.setState({ results: results, errors: "", zoom });
        }
      });
  }

  getNext() {
    this.setState(prevState => {
      const length = Object.keys(this.state.results).length;
      const count = prevState.count + 1 === length ? 0 : prevState.count + 1;
      const zoom = this.state.results[count].distance > 1600 ? 12 : 13;
      return { count, zoom };
    });
  }

  render() {
    let results, errors, coordinates, name;
    if (Object.keys(this.state.results).length) {
      let result = this.state.results[this.state.count];
      results = <Store info={result} getNext={this.getNext} />;
      coordinates = result.coordinates;
      name = result.name;
    } else {
      results = <div />;
    }

    if (this.state.errors) {
      errors = <span>{this.state.errors}</span>;
    }

    return (
      <div className="App">
        <NavBar
          title="Food Picker"
          description="Can't decide where to go? Let us choose a place nearby for you to go!"
        />
        <SearchBar placeholder="Brunch" search={this.search} />
        {errors}
        {results}
        <GoogleMap
          lat={this.state.latitude}
          lng={this.state.longitude}
          coordinates={coordinates}
          name={name}
          zoom={this.state.zoom}
        />
      </div>
    );
  }
}

export default App;
