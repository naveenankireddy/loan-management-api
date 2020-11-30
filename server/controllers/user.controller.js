const mongoose = require("mongoose");
const LoanApplication = mongoose.model("LoanApplication");
const Loan = mongoose.model("Loan");
const User = mongoose.model("User");
const userController = {
  userDashboard: async (req, res) => {
    await User.findById(req.params.id)
      .then((user) => {
        res.json({ user });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  agentDashboard: async (req, res) => {
    await LoanApplication.find()
      .populate("createdBy", "_id name")
      .then((loans) => {
        res.json({ loans });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  adminDashboard: async (req, res) => {
    await Loan.find()
      .populate("createdBy", "_id name")
      .then((loans) => {
        res.json({ loans });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

module.exports = userController;
