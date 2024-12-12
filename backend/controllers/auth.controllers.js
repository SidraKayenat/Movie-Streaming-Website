//correct


import { User } from '../model/user.model.js'
import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from '../utils/generateTokens.js';

// Signup function with added subscription plan feature
export async function signup(req, res) {
    try {
        const { email, password, username, subscriptionPlan = "Basic" } = req.body; // Default to 'Basic' subscription plan

        // Validation
        if (!email || !password || !username) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Validate email with regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid Email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }

        // Check if email or username already exists
        const existingUserByEmail = await User.findOne({ email: email });
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }

        const existingUserByUsername = await User.findOne({ username: username });
        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "Username already exists" });
        }

        // Hash the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Profile picture selection
        const PROFILE_PIC = ["/avatar1.png", "avatar2.png", "avatar3.png"];
        const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)];

        // Create new user with subscription plan
        const newUser = new User({
            email: email,
            password: hashedPassword,
            username: username,
            image: image,
            subscriptionPlan: subscriptionPlan // Store the subscription plan
        });

        // Generate token and set cookie
        generateTokenAndSetCookie(newUser._id, res);
        await newUser.save();

        res.status(201).json({
            success: true,
            user: {
                ...newUser._doc,
                password: "", // Do not send the password in the response
            }
        });

    } catch (error) {
        console.log("Error in SignUp Controller: " + error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Login function
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Find the user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" });
        }

        // Compare password
        const isPasswordCorrect = await bcryptjs.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(404).json({ success: false, message: "Invalid Credentials" });
        }

        // Generate token and set cookie
        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            success: true,
            user: {
                ...user._doc,
                password: "", // Do not send the password in the response
            }
        });

    } catch (error) {
        console.log("Error in login controller: " + error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Logout function
export async function logout(req, res) {
    try {
        res.clearCookie("jwt-netflix");
        res.status(201).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller: " + error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// Auth check function
export async function authCheck(req, res) {
    try {
        res.status(200).json({ success: true, user: req.user });
    } catch (error) {
        console.log("Error in authCheck controller: " + error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}



// Delete Account function
export async function deleteAccount(req, res) {
    try {
        const { email } = req.body; // Assuming email is sent in the request body

        // Find and delete the user by email
        const deletedUser = await User.findOneAndDelete({ email });
        if (!deletedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Clear cookies and log out the user
        res.clearCookie("jwt-netflix");

        res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        console.log("Error in deleteAccount controller: " + error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

