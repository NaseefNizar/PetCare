import bcrypt from "bcrypt";
import User from "../model/UserModel.js";
import jwt from "jsonwebtoken";
import Partner from "../model/PartnerModel.js";
const jwtSecretKey = process.env.JWT_SECRET_KEY;
export const login = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email, is_admin: 1 });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password ?? "");
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid email or password" });
            }
            const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
                expiresIn: "1d",
            });
            // if (req.cookies[`${user._id}`]) {
            //   req.cookies[`${user._id}`] = "";
            // }
            // res.cookie(String(user._id), token, {
            res.cookie('token', token, {
                path: "/",
                expires: new Date(Date.now() + 1000 * 60 * 60),
                httpOnly: true,
                sameSite: "lax",
            });
            res.status(200).json({ message: "Successfully logged in", user, token });
        }
    }
    catch (error) {
        console.error("Error during login", error);
        res.status(500).json({ message: "Error during login" });
    }
};
export const logout = (req, res) => {
    try {
        // Clear the user's token by sending an expired token
        console.log('logout');
        // res.cookie(String(req.id), "", {
        //   path: "/",
        //   expires: new Date(0),
        //   httpOnly: true,
        //   sameSite: "lax",
        // });
        res.clearCookie(String(req.id));
        res.status(200).json({ message: "Successfully logged out" });
    }
    catch (error) {
        console.error("Error during logout", error);
        res.status(500).json({ message: "Error during logout" });
    }
};
export const verifyToken = (req, res, next) => {
    // const cookies: string | undefined = req.headers.cookie;
    const cookies = req.cookies.token;
    console.log(cookies);
    if (!cookies) {
        return res.status(404).json({ message: "No token found" });
    }
    // const token: string = cookies.split("=")[1];
    const token = req.cookies.token;
    jwt.verify(String(token), jwtSecretKey, (err, user) => {
        if (err) {
            return res.status(400).json({ message: "Invalid token" });
        }
        console.log(user);
        req.id = user.userId;
    });
    next();
};
export const getUserData = async (req, res) => {
    try {
        const userData = await User.find({ is_admin: 0 });
        res.status(200).json({ userData });
    }
    catch (error) {
        console.error('Error getting user data:', error);
        res.status(500).json({ message: 'Error getting user data' });
    }
};
export const userAccess = async (req, res) => {
    try {
        const { userId, is_blocked } = req.body;
        console.log(req.body);
        const user = await User.findOneAndUpdate({ _id: userId }, {
            $set: {
                is_blocked
            }
        });
        const userData = await User.find({ is_admin: 0 });
        res.status(200).json({ userData });
    }
    catch (error) {
        console.error('Error blocking user:', error);
        res.status(500).json({ message: 'Error blocking user' });
    }
};
export const getPartnerData = async (req, res) => {
    try {
        const partnerData = await Partner.find({ is_verified: true });
        res.status(200).json({ partnerData });
    }
    catch (error) {
        console.error('Error getting user data:', error);
        res.status(500).json({ message: 'Error getting user data' });
    }
};
export const getUnverifiedPartner = async (req, res) => {
    try {
        const unverifiedPartners = await Partner.find({ is_verified: false });
        res.status(200).json({ unverifiedPartners });
    }
    catch (error) {
        console.error('Error getting user data:', error);
        res.status(500).json({ message: 'Error getting user data' });
    }
};
export const individualPartnerData = async (req, res) => {
    try {
        console.log(req.body);
        const partnerData = await Partner.findOne({ _id: req.body.id });
        res.status(200).json({ partnerData });
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting partner data' });
    }
};
export const partnerAccess = async (req, res) => {
    try {
        const { partnerId, is_blocked } = req.body;
        console.log(req.body);
        const user = await Partner.findOneAndUpdate({ _id: partnerId }, {
            $set: {
                is_blocked
            }
        });
        const partnerData = await Partner.find({});
        res.status(200).json({ partnerData });
    }
    catch (error) {
        console.error('Error blocking partner:', error);
        res.status(500).json({ message: 'Error blocking partner' });
    }
};
//# sourceMappingURL=adminController.js.map