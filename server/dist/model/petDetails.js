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
        type: Number,
    },
    petWeight: {
        type: Number,
    },
});
const PetDetails = mongoose.model("PetDetails", petDetailSchema);
export default PetDetails;
//# sourceMappingURL=petDetails.js.map