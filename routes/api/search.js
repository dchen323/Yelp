const express = require("express");
const yelp = require("yelp-fusion");
const router = express.Router();

const secrets = require("../../config/secrets");

const apiKey = secrets.apiKey;
// const searchRequest = {
//   term: "Four Barrel Coffee",
//   location: "san francisco, ca"
// };

const client = yelp.client(apiKey);

router.get("/", (req, res) => {
  const { term, latitude, longitude, radius, open_now } = req.query;
  const searchRequest = {
    term,
    latitude,
    longitude,
    radius,
    open_now
  };

  client
    .search(searchRequest)
    .then(response => {
      return res.json({ response: response.body });
    })
    .catch(e => {
      console.log(e);
    });
});

module.exports = router;
