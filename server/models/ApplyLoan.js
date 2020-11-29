const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;
const ApplyLoan = new Schema({
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
  address: {
    type: String,
    required: true,
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
  },
});

mongoose.model("ApplyLoan", ApplyLoan);
