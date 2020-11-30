const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const LoanApplication = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  contact: {
    type: String,
    required: true,
    maxlength: 10,
  },
  aadhar: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  customerId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

mongoose.model("LoanApplication", LoanApplication);
