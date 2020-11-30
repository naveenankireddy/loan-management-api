const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const Loan = new Schema({
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
    minlength: 10,
  },
  aadhar: {
    type: String,
    required: true,
    minlength: 12,
  },
  address: {
    type: String,
    required: true,
  },
  interest: {
    type: Number,
    required: true,
  },
  state: {
    type: String,
    default: "new",
    enum: ["new", "approved", "rejected"],
  },
  customerId: {
    type: ObjectId,
    ref: "user",
    required: true,
  },
  agentId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
});

mongoose.model("Loan", Loan);
