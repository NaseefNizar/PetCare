import mongoose from "mongoose";
const partnerSchema = new mongoose.Schema({
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
        minlength: 8
    },
    contactNumber: {
        type: Number,
        unique: true
    },
    role: {
        type: String
    }
});
const Partner = mongoose.model('Partner', partnerSchema);
export default Partner;
//# sourceMappingURL=PartnerModel.js.map