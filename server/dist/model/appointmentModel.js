import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    partnerId: {
        type: mongoose.Types.ObjectId,
        ref: "Partner",
    },
    date: {
        type: Date,
    },
    slot: {
        type: String,
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
    paymentStatus: {
        type: String,
    },
    paymentIntentId: {
        type: String,
    },
    status: {
        type: String,
        default: 'Booked'
    }
});
const Appointment = mongoose.model("Appointment", appointmentSchema);
export default Appointment;
//# sourceMappingURL=appointmentModel.js.map