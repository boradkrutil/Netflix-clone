import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js";

export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, error: true, message: "Missing Dependency" })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid Email" })
        }
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters long" })
        }
        const existinguser = await User.findOne({ email: email })
        if (existinguser) {
            return res.status(400).json({ success: false, message: "Email already registered" })
        }
        const existingusername = await User.findOne({ username: username })
        if (existingusername) {
            return res.status(400).json({ success: false, message: "username already registered" })
        }

        const salt = bcrypt.genSaltSync(10);
        const hashpassword = await bcrypt.hashSync("password", salt);

        const PROFILE_PICS = ["/avtar1.png", "/avtar2.png", "/avtar3.png"]
        const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)]

        const newUser = new User({
            email,
            password: hashpassword,
            username,
            image
        })


        generateToken(newUser._id, res)
        await newUser.save()


        res.status(200).json({
            user: {
                ...newUser._doc,
                password: ""
            },
            success: true,
            message: "User created successfully"
        })

    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: true
        })
    }
}
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing Dependency" })
        }
        let user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid Email" })
        }
        // console.log(user);
        // console.log(user.password);
        const isMatch = await bcrypt.compare(password, user.password)
        // console.log(isMatch);
        if (isMatch) {
            return res.status(400).json({ success: false, message: "Invalid Password" })
        }
        generateToken(user._id, res)
        res.status(200).json({ success: true, message: "Logged in successfully", user: { ...user._doc, password: "" } })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: true
        })
    }
}
export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: true
        })
    }
}