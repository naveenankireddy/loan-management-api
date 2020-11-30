const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const loanController = require("../controllers/loan.controller");
const userController = require("../controllers/user.controller");

const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
} = require("../utils/Auth");

// Users Registeration Route
router.post("/register-user", async (req, res) => {
  await userRegister(req.body, "user", res);
});

// Users Login Route
router.post("/login-user", async (req, res) => {
  await userLogin(req.body, "user", res);
});

//Users Dashboard
router.get("/:id", userAuth, checkRole(["user"]), userController.userDashboard);

// Profile Route
router.get("/profile", userAuth, async (req, res) => {
  return res.json(serializeUser(req.user));
});
//user apply loan
router.post(
  "/loan/apply",
  userAuth,
  checkRole(["user"]),
  loanController.userApplyLoan
);

// Admin Registration Route
router.post("/register-admin", async (req, res) => {
  await userRegister(req.body, "admin", res);
});
// Admin Login Route
router.post("/login-admin", async (req, res) => {
  await userLogin(req.body, "admin", res);
});

// Agent Registration Route
router.post("/register-agent", async (req, res) => {
  await userRegister(req.body, "agent", res);
});

// Agent Login Route
router.post("/login-agent", async (req, res) => {
  await userLogin(req.body, "agent", res);
});

module.exports = router;
