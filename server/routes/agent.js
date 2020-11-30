const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { userAuth, checkRole } = require("../utils/Auth");
const AgentApplyLoan = mongoose.model("AgentApplyLoan");

//Agent DashBoard

router.get("/", userAuth, checkRole(["agent"]), (req, res) => {
  ApplyLoan.find()
    .populate("createdBy", "_id name")
    .then((loans) => {
      res.json({ loans });
    })
    .catch((err) => {
      console.log(err);
    });
});

//Agent can Apply loan on behalf of user

router.post("/loan/apply", userAuth, checkRole(["agent"]), (req, res) => {
  const { username, contact, aadhar, creditScore, loanAmount } = req.body;
  if (!username || !contact || !aadhar || !creditScore || !loanAmount) {
    return res.status(422).json({ error: "Please provide all fileds" });
  }
  req.user.password = undefined;
  const applyLoan = new AgentApplyLoan({
    username,
    loanAmount,
    contact,
    aadhar,
    creditScore,
    createdBy: req.user,
  });
  applyLoan
    .save()
    .then((result) => {
      res.json({ applyLoan: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
