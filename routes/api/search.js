const express = require("express");
const yelp = require("yelp-fusion");
const router = express.Router();

const secrets = require("../../config/secrets");

const apiKey = secrets.apiKey;
const searchRequest = {
  term: "Four Barrel Coffee",
  location: "san francisco, ca"
};

const client = yelp.client(apiKey);

router.get("/", (req, res) => res.json({ test: "test" }));

router.get("/test", (req, res) => {
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
