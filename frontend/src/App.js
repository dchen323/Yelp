import React, { Component } from "react";
import axios from "axios";
import "./App.css";

import Store from "./components/Store";

class App extends Component {
  constructor() {
    super();
    this.state = {
      latitude: 0,
      longitude: 0,
      results: {}
    };

    this.testSearch = this.testSearch.bind(this);
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

    this.testSearch();
  }

  testSearch() {
    // axios.get("/api/search/test").then(res => {
    //   const results = JSON.parse(res.data.response).businesses;
    //   const length = Math.floor(Math.random() * results.length);
    //   console.log(results[0]);
    //   this.setState({ results: results[0] });
    // });

    const results = {
      id: "E8RJkjfdcwgtyoPMjQ_Olg",
      alias: "four-barrel-coffee-san-francisco",
      name: "Four Barrel Coffee",
      image_url:
        "https://s3-media3.fl.yelpcdn.com/bphoto/E17wpmhnO4bwfT_MVgaIJw/o.jpg",
      is_closed: false,
      url:
        "https://www.yelp.com/biz/four-barrel-coffee-san-francisco?adjust_creative=g-U1FI1GeW81HT4B_BU1Rg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=g-U1FI1GeW81HT4B_BU1Rg",
      review_count: 2025,
      categories: [
        {
          alias: "coffee",
          title: "Coffee & Tea"
        }
      ],
      rating: 4,
      coordinates: {
        latitude: 37.7670169511878,
        longitude: -122.42184275
      },
      transactions: [],
      price: "$",
      location: {
        address1: "375 Valencia St",
        address2: "",
        address3: "",
        city: "San Francisco",
        zip_code: "94103",
        country: "US",
        state: "CA",
        display_address: ["375 Valencia St", "San Francisco, CA 94103"]
      },
      phone: "+14152520800",
      display_phone: "(415) 252-0800",
      distance: 1452.8696502343696
    };

    this.setState({ results });
  }

  render() {
    let results;
    if (Object.keys(this.state.results).length) {
      results = <Store info={this.state.results} />;
    } else {
      results = <div />;
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1>FIND A FOOD RECOMMENDATION NEARBY</h1>
          {results}
        </header>
      </div>
    );
  }
}

export default App;
