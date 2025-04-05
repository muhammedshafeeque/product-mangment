import { PROFILES } from "../Models/ProfileModal.js";
import { USERS } from "../Models/userModal.js";

import jwt from "jsonwebtoken";

export const VerifyLogin = async (req, res, next) => {
    try {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }
       
        if (!token) {
            return res.status(401).json({ message: "You are not logged in" });
        }
        let decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await USERS.findById(decoded.userId);
        const profile = await PROFILES.findOne({user:user._id});
        if (!user) {
            return res.status(401).json({ message: "You are not logged in" });
        }
        req.user = user;
        req.profile = profile;
        next();
    } catch (error) {
        console.log(error)
        next(error)
    }
}
export const VerifySeller = async (req, res, next) => {
    const user = req.user;  
    if (req.profile.userType !== "seller") {
        return res.status(401).json({ message: "You are not a seller" });
    }
    next();
}