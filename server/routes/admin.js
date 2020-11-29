const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const CreateLoan = mongoose.model("CreateLoan");
const User = mongoose.model("User");

const {
  userAuth,
  userLogin,
  checkRole,
  userRegister,
  serializeUser,
} = require("../utils/Auth");

//dashboard
// router.get("/", async (req, res, next) => {
//   try {
//     var loans = await CreateLoan.find();
//     res.json({ loans });
//   } catch (error) {
//     next(error);
//   }
// });
router.get("/", (req, res) => {
  CreateLoan.find()
    .populate("createdBy", "_id name")
    .then((loans) => {
      res.json({ loans });
    })
    .catch((err) => {
      console.log(err);
    });
});

// create loan this is under admin survilence one he can create loan
router.post(
  "/loan/create",
  userAuth,
  checkRole(["admin", "agent"]),
  (req, res) => {
    const { amount, duration, interest } = req.body;
    if (!amount || !duration || !interest) {
      return res.status(422).json({ error: "Please provide all fileds" });
    }
    req.user.password = undefined;
    const createLoan = new CreateLoan({
      amount,
      duration,
      interest,
      createdBy: req.user,
    });
    createLoan
      .save()
      .then((result) => {
        res.json({ createLoan: result });
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
// router.post(

// update loan and this is also done by only admin
router.put(
  "/loan/:id",
  userAuth,
  checkRole(["admin", "agent"]),
  (req, res, next) => {
    const updateLoan = new CreateLoan({
      _id: req.params.id,
      amount: req.body.amount,
      duration: req.body.duration,
      interest: req.body.interest,
      createdBy: req.user,
      userId: req.body.userId,
    });
    updateLoan
      .updateOne({ _id: req.params.id }, updateLoan)
      .then(() => {
        res.status(201).json({
          message: updateLoan,
        });
      })
      .catch((error) => {
        res.status(400).json({
          error: error,
        });
      });
  }
);
//delete a loan and this is also done by admin only
router.delete("/loan/:id", (req, res, next) => {
  CreateLoan.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({
        message: "Deleted!",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
});
module.exports = router;
