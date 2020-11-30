const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const loanController = require("../controllers/loan.controller");
const userController = require("../controllers/user.controller");
const Loan = mongoose.model("Loan");
const User = mongoose.model("User");

const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
} = require("../utils/Auth");

//dashboard
router.get("/", userAuth, checkRole(["admin"]), userController.adminDashboard);

//usersList this done by both admin and agent
router.get("/usersList", userAuth, checkRole(["admin"]), (req, res) => {
  User.find()
    .populate("createdBy", "_id name")
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      connsole.log(err);
    });
});
//user view this done by both agent and admin
router.get(
  "/userView",
  userAuth,
  checkRole(["admin", "agent"]),
  (req, res) => {}
);

// update loan and this is also done by only admin
router.put(
  "/loan/:id",
  userAuth,
  checkRole(["admin"]),
  loanController.adminUpdateLoan
);
//delete a loan and this is also done by admin only
router.delete("/loan/:id", loanController.adminDeleteLoan);
module.exports = router;
