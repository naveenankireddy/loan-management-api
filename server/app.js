const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 5000;
const { MONGOURI } = require("./keys");
const cors = require("cors");
const bp = require("body-parser");
const passport = require("passport");

//mongodb connection
mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("mongo db connected hurry");
});
mongoose.connection.on("err", () => {
  console.log("error in connection");
});

// models
require("./models/User");
require("./models/CreateLoan");
require("./models/ApplyLoan");
//middlewares
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());

//passport config
require("./middlewares/passport")(passport);

app.use(express.json());
app.use("/api/users", require("./routes/users"));
app.use("/api", require("./routes/admin"));

app.listen(PORT, () => {
  console.log("Server is started at", PORT, "CC dug dug dug dug dug.......");
});
