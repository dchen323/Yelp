const express = require("express");
const search = require("./routes/api/search");

const app = express();

app.use("/api/search", search);

const port = process.env.PORT || 3001;

app.listen(port, () => console.log("Listening on port ", port));
