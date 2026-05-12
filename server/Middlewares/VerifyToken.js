import jwt from "jsonwebtoken";
export const VerifyToken = (req, res, next) => {

    const token = req.cookies.token
    console.log(req.cookies);
    console.log("token is :",token)
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log('verify token', req.user);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}










