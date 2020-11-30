const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const loanController = require("../controllers/loan.controller");
const userController = require("../controllers/user.controller");
const { userAuth, checkRole } = require("../utils/Auth");

//Agent DashBoard

router.get("/", userAuth, checkRole(["agent"]), userController.agentDashboard);

//Agent can Apply loan on behalf of user

router.post(
  "/loan/apply",
  userAuth,
  checkRole(["agent"]),
  loanController.agentCreateLoan
);

router.post(
  "/loan/:id/update",
  userAuth,
  checkRole(["agent"]),
  loanController.agentUpdateLoan
);

module.exports = router;
