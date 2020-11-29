const { Schema, model } = require("mongoose");

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
});

module.exports = model("applyloan", ApplyLoan);
