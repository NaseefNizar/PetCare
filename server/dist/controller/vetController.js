import bcrypt from "bcrypt";
import Partner from "../model/PartnerModel.js";
import jwt from "jsonwebtoken";
const jwtSecretKey = process.env.JWT_SECRET_KEY;
export const signup = async (req, res) => {
    console.log(req.body);
    const { name, email, password, contactNumber, role } = req.body;
    try {
        const existingUser = await Partner.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists!! Login" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPartner = new Partner({
            name,
            email,
            password: hashedPassword,
            contactNumber,
            role
        });
        await newPartner.save();
        res.status(201).json({ message: "Signup successful", newPartner });
    }
    catch (error) {
        console.error("Error during signup", error);
        res.status(500).json({ message: "Error during signup" });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        const user = await Partner.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const passwordMatch = await bcrypt.compare(password, user.password || "");
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: user._id }, jwtSecretKey, {
            expiresIn: "35s",
        });
        console.log("Generated Token \n", token);
        if (req.cookies[`${user._id}`]) {
            req.cookies[`${user._id}`] = "";
        }
        res.cookie(String(user._id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: 'lax'
        });
        res.status(200).json({ message: "Successfully logged in", token, user });
    }
    catch (error) {
        console.error("Error during login", error);
        res.status(500).json({ message: "Error during login" });
    }
};
//# sourceMappingURL=vetController.js.map