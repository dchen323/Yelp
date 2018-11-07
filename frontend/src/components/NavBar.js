import React from "react";

export default function NavBar(props) {
  return (
    <div className="App-header">
      <h1>{props.title}</h1>
      <h3>{props.description}</h3>
    </div>
  );
}
