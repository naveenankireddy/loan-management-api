const mongoose = require("mongoose");
const Loan = mongoose.model("Loan");
const LoanApplication = mongoose.model("LoanApplication");
const loanController = {
  //   adminLoanCreate: async (req, res) => {
  //     const { amount, duration, interest } = req.body;
  //     if (!amount || !duration || !interest) {
  //       return res.status(422).json({ error: "Please provide all fileds" });
  //     }
  //     req.user.password = undefined;
  //     const createLoan = await new Loan({
  //       amount,
  //       duration,
  //       interest,
  //       createdBy: req.user,
  //     });
  //     createLoan
  //       .save()
  //       .then((result) => {
  //         res.json({ createLoan: result });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   },
  adminUpdateLoan: async (req, res, next) => {
    const updateLoan = await new Loan({
      _id: req.params.id,
      amount: req.body.amount,
      duration: req.body.duration,
      contact: req.body.contact,
      aadhar: req.body.aadhar,
      interest: req.body.interest,
      agentId: req.user,
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
  },
  adminDeleteLoan: async (req, res, next) => {
    await Loan.deleteOne({ _id: req.params.id })
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
  },

  userApplyLoan: async (req, res) => {
    const { amount, duration, contact, aadhar, address } = req.body;
    if (!amount || !duration || !contact || !aadhar || !address) {
      return res.status(422).json({ error: "Please provide all fileds" });
    }
    req.user.password = undefined;
    const applyLoan = await new LoanApplication({
      amount,
      duration,
      contact,
      aadhar,
      address,
      customerId: req.user,
    });
    applyLoan
      .save()
      .then((result) => {
        res.json({ applyLoan: result });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  agentCreateLoan: async (req, res) => {
    const { amount, duration, contact, aadhar, address, interest } = req.body;
    if (!amount || !duration || !contact || !aadhar || !address || !interest) {
      return res.status(422).json({ error: "Please provide all fileds" });
    }
    req.user.password = undefined;
    const loan = await new Loan({
      amount,
      duration,
      contact,
      aadhar,
      address,
      interest,
      agentId: req.user,
      customerId: req.body.customerId,
    });
    loan
      .save()
      .then((result) => {
        res.json({ loan: result });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  agentUpdateLoan: async (req, res, next) => {
    if (!req.params.id) {
      return res.status(402).json({
        error: "Unauthorized user. login to continue...",
      });
    }
    const singleLoan = await Loan.findOne({ _id: req.params.id });
    console.log(singleLoan, "ytdytdytdtdtrtrd");

    const updateLoan = {
      amount: req.body.amount,
      duration: req.body.duration,
      interest: req.body.interest,
      contact: req.body.contact,
      aadhar: req.body.aadhar,
      address: req.body.address,
      //   agentId: req.user,
      //   customerId: req.body.customerId,
    };
    if (singleLoan.state == "new") {
      Loan.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: updateLoan,
        },
        { new: true, upsert: true },
        (err, data) => {
          console.log(data, "data");
          if (err) {
            res.status(400).json({
              error: err,
            });
          } else {
            res.status(200).json({
              data,
            });
          }
        }
      );
    } else {
      return res.status(400).json({
        error: `Your loan is ${singleLoan.state}.`,
      });
    }
  },
};

module.exports = loanController;
