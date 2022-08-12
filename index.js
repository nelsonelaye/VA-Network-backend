const express = require("express");
require("./config/database");
const port = 2000;

const app = express();

app.get("/", (req, res) => {
  res.send(
    "VA Network - transforming Africa through volunteering opportunities around the continent"
  );
});

app.listen(port, () => {
  console.log("Listening on port: ", port);
});
