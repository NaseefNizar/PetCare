import bcrypt from "bcrypt";
import Partner from "../model/PartnerModel.js";
import jwt from "jsonwebtoken";
const jwtSecretKey = process.env.JWT_SECRET_KEY;
export const existingUser = async (req, res, next) => {
    const { email, contactNumber } = req.body;
    const existingUser = await Partner.findOne({
        $or: [{ email }, { contactNumber }],
    });
    if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
    }
    next();
};
export const signup = async (req, res) => {
    console.log(req.body);
    const { firstName, email, password, contactNumber, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newPartner = new Partner({
            firstName,
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
            expiresIn: "1d",
        });
        console.log("Generated Token \n", token);
        // if(req.cookies[`${user._id}`]) {
        //     req.cookies[`${user._id}`] = ""
        // }
        res.cookie(String(user._id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 60 * 60),
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
export const logout = async (req, res) => {
    try {
        res.clearCookie(String(req.id));
        res.status(200).json({ message: "Successfully logged out" });
    }
    catch (error) {
        console.error("Error during logout", error);
        res.status(500).json({ message: "Error during logout" });
    }
};
export const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    console.log('hdjjh', req.cookies);
    if (!cookies) {
        return res.status(404).json({ message: "No token found" });
    }
    const token = cookies.split("=")[1];
    jwt.verify(String(token), jwtSecretKey, (err, user) => {
        if (err) {
            return res.status(400).json({ message: "Invalid token" });
        }
        // console.log('jwt',user);
        req.id = user.userId;
    });
    next();
};
export const getPartnerData = async (req, res) => {
    try {
        const partnerData = await Partner.findById({ _id: req.id });
        res.status(200).json({ partnerData });
    }
    catch (error) {
        res.status(500).json({ message: "Error getting data" });
    }
};
export const updatePartner = async (req, res) => {
    try {
        console.log("update", req.body);
        console.log("id", req.id);
        const { firstName, lastName, contactNumber, email } = req.body;
        const userData = await Partner.findByIdAndUpdate(req.id, {
            $set: {
                firstName,
                lastName,
                email,
                contactNumber,
            },
        });
        res.status(200).json({ message: "Updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user data" });
    }
};
export const updatePartnerProfilePic = async (req, res) => {
    try {
        console.log("files", req.file);
        if (req.file) {
            const imagePath = req.file.filename;
            const userData = await Partner.findByIdAndUpdate(req.id, {
                $set: {
                    picture: `http://localhost:8000/users/${imagePath}`,
                },
            });
            res.status(200).json({ message: "Updated successfully" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user data" });
    }
};
//# sourceMappingURL=partnerController.js.map