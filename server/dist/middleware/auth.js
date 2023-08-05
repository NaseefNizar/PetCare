import jwt from "jsonwebtoken";
const jwtSecretKey = process.env.JWT_SECRET_KEY;
const refreshToken = async (req, res, next) => {
    const cookies = req.headers.cookie || '';
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
        return res.status(400).json({ message: "Token not found" });
    }
    jwt.verify(String(prevToken), jwtSecretKey, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: "Authentication failed" });
        }
        // res.clearCookie(`${user.id}`)
        // req.cookies[`${user.id}`] = ""    
        // const token = jwt.sign({ userId: user.id }, jwtSecretKey, {
        //     expiresIn: "35s",
        //   });
        const decodedToken = user;
        res.clearCookie(decodedToken.userId);
        req.cookies[decodedToken.userId] = '';
        const token = jwt.sign({ userId: decodedToken.userId }, jwtSecretKey, {
            expiresIn: '35s',
        });
        console.log("Regenerated Token \n", token);
        //   res.cookie(String(user.id),token, {
        res.cookie(decodedToken.userId, token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: 'lax'
        });
        // req.id = user.id
        req.id = decodedToken.userId;
        next();
    });
};
//# sourceMappingURL=auth.js.map