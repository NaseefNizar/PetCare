import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
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
      unique: true
    },
    is_admin:{
      type:Number,
      default:0
    },
    picture: {
      type: String
    },
    role:{
      type:String
    }
  });

const User = mongoose.model('User', userSchema)

export default User
