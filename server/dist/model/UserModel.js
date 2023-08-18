import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String
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
    is_admin: {
        type: Number,
        default: 0
    },
    picture: {
        type: String
    },
    role: {
        type: String,
        default: 'user'
    },
    is_blocked: {
        type: Boolean,
        default: false
    }
});
const User = mongoose.model('User', userSchema);
export default User;
//# sourceMappingURL=UserModel.js.map