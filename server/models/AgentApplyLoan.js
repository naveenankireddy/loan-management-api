const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const AgentApplyLoan = new Schema({
  username: {
    type: String,
    required: true,
  },
  loanAmount: {
    type: String,
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
    maxlength: 12,
  },
  creditScore: {
    type: String,
    required: true,
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
  },
});

mongoose.model("AgentApplyLoan", AgentApplyLoan);
