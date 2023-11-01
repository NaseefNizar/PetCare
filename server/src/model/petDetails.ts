import mongoose from "mongoose";

const petDetailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  petName: {
    type: String,
  },
  petKind: {
    type: String,
  },
  petBreed: {
    type: String,
  },
  petAge: {
    type: String,
  },
  petWeight: {
    type: String,
  },
});

const PetDetails = mongoose.model("PetDetails",petDetailSchema);

export default PetDetails
