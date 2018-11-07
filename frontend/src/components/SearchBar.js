import React, { Component } from "react";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ""
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const text = e.target.value;
    this.setState({ text });
  }

  render() {
    return (
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={this.state.text}
          placeholder={this.props.placeholder}
          onChange={this.onChange}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            onClick={() => this.props.search(this.state.text)}
          >
            Find a Recommendation
          </button>
        </div>
      </div>
    );
  }
}
