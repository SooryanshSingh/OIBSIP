const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const sendVerificationEmail = async (email, token) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const verifyLink =
        `http://localhost:5173/verify/${token}`;

    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Verify your Pizza App account",
        html: `
            <h2>Email Verification</h2>
            <p>Click the link below to verify your account:</p>
            <a href="${verifyLink}">${verifyLink}</a>
        `
    });
};

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const verificationToken =
            crypto.randomBytes(32).toString("hex");

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationToken,
            isVerified: false
        });

        await sendVerificationEmail(
            user.email,
            verificationToken
        );

        res.status(201).json({
            message:
                "Registration successful. Please verify your email.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const user = await User.findOne({
            verificationToken: req.params.token
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid verification token"
            });
        }

        user.isVerified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({
            message: "Email verified successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Please fill all fields"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        if (!user.isVerified) {
            return res.status(400).json({
                message: "Please verify your email first"
            });
        }

        const passwordMatch =
            await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isAdmin: user.role === "admin"
            }
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};const forgotPassword = async (req, res) => {
    try {

        console.log("FORGOT PASSWORD HIT");

        const { email } = req.body;

        console.log("EMAIL:", email);

        const user = await User.findOne({ email });

        console.log("USER FOUND:", user);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const resetToken =
            crypto.randomBytes(32).toString("hex");

        console.log(
            "GENERATED TOKEN:",
            resetToken
        );

        user.resetPasswordToken =
            resetToken;

        user.resetPasswordExpires =
            Date.now() + 60 * 60 * 1000;

        await user.save();

        console.log(
            "TOKEN AFTER SAVE:",
            user.resetPasswordToken
        );

        console.log(
            "EXPIRY AFTER SAVE:",
            user.resetPasswordExpires
        );

        const transporter =
            nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

        const resetLink =
            `http://localhost:5173/reset-password/${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Reset your password",
            html: `
                <h2>Password Reset</h2>
                <a href="${resetLink}">
                    Reset Password
                </a>
            `
        });

        res.json({
            message:
                "Password reset email sent"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const resetPassword = async (req, res) => {
    try {

        console.log(
            "RESET PASSWORD HIT"
        );

        console.log(
            "TOKEN RECEIVED:",
            req.params.token
        );

        const { password } = req.body;

        const user = await User.findOne({
            resetPasswordToken:
                req.params.token,
            resetPasswordExpires: {
                $gt: Date.now()
            }
        });

        console.log(
            "USER FOUND:",
            user
        );

        if (!user) {
            return res.status(400).json({
                message:
                    "Invalid or expired token"
            });
        }

        user.password =
            await bcrypt.hash(
                password,
                10
            );

        user.resetPasswordToken =
            undefined;

        user.resetPasswordExpires =
            undefined;

        await user.save();

        res.json({
            message:
                "Password reset successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    forgotPassword,
    resetPassword
};
