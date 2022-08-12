const mongoose = require("mongoose");

const url = "mongodb://localhost/VANetworkDb";

mongoose
  .connect(url)
  .then(() => {
    console.log("Coonected to database");
  })
  .catch((err) => {
    console.log(err.message);
  });

module.exports = mongoose;
