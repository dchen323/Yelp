import React from "react";
import ReactStars from "react-stars";

export default function Store(props) {
  console.log(props);
  return (
    <div className="container-fluid">
      <div className="row">
        <img
          src={props.info.image_url}
          alt={props.info.name}
          className="col-md-auto picture"
        />
        <div className="col">
          <div className="row justify-content-md-center">
            <div className="col-6">{props.info.name}</div>
            <div className="col-md-auto">
              {props.info.location.display_address.join(", ")}
            </div>
            <div className="col col-lg-2">{props.info.display_phone}</div>
          </div>
          <h3>{props.info.is_closed}</h3>
          <ReactStars
            value={props.info.rating}
            color1="gray"
            color2="yellow"
            count={5}
          />
          <h3>{props.info.price}</h3>
          <a href={props.info.url}>Yelp Page</a>
        </div>
      </div>
    </div>
  );
}
