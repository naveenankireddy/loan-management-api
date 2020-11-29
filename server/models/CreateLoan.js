const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const CreateLoan = new Schema({
  amount: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  interest: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: ObjectId,
    ref: "User",
  },
});

mongoose.model("CreateLoan", CreateLoan);
