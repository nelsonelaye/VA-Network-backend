require("./config/database");
const express = require("express");
const cors = require("cors");
const port = 2000;

const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send(
    "VA Network - transforming Africa through volunteering opportunities around the continent"
  );
});

app.use("/api", require("./router/volunteer"));
app.use("/api", require("./router/ngo"));
app.use("/api", require("./router/project"));

app.listen(port, () => {
  console.log("Listening on port: ", port);
});
