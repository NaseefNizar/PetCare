import mongoose from "mongoose";

const kycSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  centreName: {
    type: String,
    required: true,
  },
  locality: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  branchName: {
    type: String,
    required: true,
  },
  accountHolderName: {
    type: String,
    required: true,
  },
  accountNumber: {
    type: String,
    required: true,
  },
  ifsc: {
    type: String,
    required: true,
  },
  poi: {
    type: String,
    // required: true,
  },
  poq: {
    type: String,
    // required: true,
  },
  photo: {
    type: String,
    // required: true,
  },
});

const Kyc = mongoose.model("Kyc", kycSchema);

export default Kyc;
