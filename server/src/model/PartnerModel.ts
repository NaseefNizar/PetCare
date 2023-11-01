import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema({
    userId:{
      type:String
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
    is_verified:{
      type:Boolean,
      default:false
    },
    is_kycSubmitted: {
      type:Boolean,
      default:false
    },
    // kycDataId: {
    //   type: mongoose.Types.ObjectId,
    //   ref: "Kyc",
    // },
    firstName: {
      type: String,
      // required: true,
    },
    lastName: {
      type: String,
    },
    qualification: {
      type:String,
    },
    experience: {
      type:String,
    },
    centreName: {
      type: String,
      // required: true,
    },
    locality: {
      type: String,
      // required: true,
    },
    area: {
      type: String,
      // required: true,
    },
    pincode: {
      type: String,
      // required: true,
    },
    onlineconsultationfee: {
      type: String,
    },
    offlineconsultationfee: {
      type: String,
    },
    state: {
      type: String,
      // required: true,
    },
    bankName: {
      type: String,
      // required: true,
    },
    branchName: {
      type: String,
      // required: true,
    },
    accountHolderName: {
      type: String,
      // required: true,
    },
    accountNumber: {
      type: String,
      // required: true,
    },
    ifsc: {
      type: String,
      // required: true,
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
    availableSlots: [
      {
        date: Date,
        slots: [{
          time:{
            type:String
          },
          status:{
            type:Boolean,
            default:false
          }
        }]
      }
    ]
  });

const Partner = mongoose.model('Partner', partnerSchema)

export default Partner