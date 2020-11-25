const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const { MONGOURI } = require("./keys");

//mongodb connection
mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("mongo db connected hurry");
});
mongoose.connection.on("err", () => {
  console.log("error in connection");
});

// models
require("./models/admin");
require("./models/agent");
require("./models/user");
app.use(express.json());
app.use(require("./routes/auth"));

app.listen(PORT, () => {
  console.log("Server is started at", PORT, "CC dug dug dug dug dug.......");
});
