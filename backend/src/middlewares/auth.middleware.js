import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    try {
        const decoded = verifyToken(token);
        const userId = decoded.sub || decoded.id; // make sure verifyToken encodes `sub` or `id`
        if (!userId) {
            return res.status(401).json({ message: "Invalid token payload" });
        }

        const user = await findUserById(userId);
        if (!user) return res.status(401).json({ message: "User not found" });

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};