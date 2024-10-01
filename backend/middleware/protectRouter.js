import jwt from 'jsonwebtoken'
import { ENV_VARS } from '../config/envVARs.js'
import { User } from '../models/user.model.js'



export const protectRouter = async (req, res, next) => {
    console.log("object");
    try {
        const token = req.cookies["jwt-netflix"]
        console.log(token);
        if (!token) {
            return res.status(401).json({ success: false, message: "Unauthorized Access no token" })
        }

        const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET)
        if (!decoded) {
            return res.status(401).json({ success: false, message: "Unauthorized Access denied" })
        }
        const user = await User.findById(decoded.userId).select("-password")
        if (!user) {
            return res.status(401).json({ success: false, message: "user not found" })
        }
        req.user = user

        next()
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "internal server error" })
    }
}