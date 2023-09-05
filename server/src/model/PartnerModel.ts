import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      minlength : 8
    },
    contactNumber: {
      type: Number,
      unique:true
    },
    role:{
      type:String
    },
    picture: {
      type: String
    },
    is_blocked:{
      type:Boolean,
      default:false
    },
    centreName:{
      type: String
    },
    locality:{
      type: String
    },
    area: {
      type: String
    },
    pincode: {
      type: String
    },
    state: {
      type: String
    },
    bankName: {
      type: String
    },
    branchName: {
      type: String
    },
    accountHolderName: {
      type: String
    },
    accountNumber: {
      type: String
    },
    ifsc: {
      type: String
    },
    poi: {
      type: String
    },
    poq: {
      type: String
    },
    is_verified:{
      type:Boolean,
      default:false
    },
    is_kycSubmitted: {
      type:Boolean,
      default:false
    }
  });

const Partner = mongoose.model('Partner', partnerSchema)

export default Partner