import React from "react";
import ReactStars from "react-stars";

export default function Store(props) {
  return (
    <div className="container-fluid store">
      <div className="row">
        <img
          src={props.info.image_url}
          alt={props.info.name}
          className="col-md-auto picture"
        />
        <div className="col info-border">
          <div className="row md-center information-divider">
            <div className="col-6">
              <a href={props.info.url} className="title">
                {props.info.name}
              </a>
            </div>
            <div className="col">
              <ReactStars
                value={props.info.rating}
                color1="gray"
                color2="yellow"
                count={5}
                edit={false}
              />
            </div>
            <div className="col">{props.info.price}</div>
          </div>
          <div className="row md-center information-divider">
            <div className="col">
              {props.info.location.display_address.join(", ")}
            </div>
          </div>
          <div className="row md-center information-divider">
            <div className="col col">{props.info.display_phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
