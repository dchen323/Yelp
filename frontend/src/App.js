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
      errors: ""
    };
    this.count = 0;
    this.search = this.search.bind(this);
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
          business => business.distance <= 1900
        );
        if (results.length === 0) {
          this.setState({
            errors:
              "Sorry could not find any results try a broader search term!"
          });
        } else {
          const length = Math.floor(Math.random() * results.length);
          this.setState({ results: results[length], errors: "" });
        }
      });

    // const results = {
    //   id: "E8RJkjfdcwgtyoPMjQ_Olg",
    //   alias: "four-barrel-coffee-san-francisco",
    //   name: "Four Barrel Coffee",
    //   image_url:
    //     "https://s3-media3.fl.yelpcdn.com/bphoto/E17wpmhnO4bwfT_MVgaIJw/o.jpg",
    //   is_closed: false,
    //   url:
    //     "https://www.yelp.com/biz/four-barrel-coffee-san-francisco?adjust_creative=g-U1FI1GeW81HT4B_BU1Rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=g-U1FI1GeW81HT4B_BU1Rg",
    //   review_count: 2025,
    //   categories: [
    //     {
    //       alias: "coffee",
    //       title: "Coffee & Tea"
    //     }
    //   ],
    //   rating: 4,
    //   coordinates: {
    //     latitude: 37.7670169511878,
    //     longitude: -122.42184275
    //   },
    //   transactions: [],
    //   price: "$",
    //   location: {
    //     address1: "375 Valencia St",
    //     address2: "",
    //     address3: "",
    //     city: "San Francisco",
    //     zip_code: "94103",
    //     country: "US",
    //     state: "CA",
    //     display_address: ["375 Valencia St", "San Francisco, CA 94103"]
    //   },
    //   phone: "+14152520800",
    //   display_phone: "(415) 252-0800",
    //   distance: 1452.8696502343696
    // };

    // this.setState({ results });
  }

  render() {
    let results, errors, coordinates, name;
    if (Object.keys(this.state.results).length) {
      results = <Store info={this.state.results} />;
      coordinates = this.state.results.coordinates;
      name = this.state.results.name;
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
        />
      </div>
    );
  }
}

export default App;
