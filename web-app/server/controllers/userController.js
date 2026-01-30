const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const nodemailer = require('nodemailer');

// Helper to send email using Nodemailer
const sendEmail = async (email, subject, text) => {
    try {
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            const transporter = nodemailer.createTransport({
                service: 'gmail', // Default to Gmail, or use host/port from env if needed
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
            });

            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject,
                text
            });
            console.log(`[EMAIL SENT] To: ${email} via Nodemailer`);
        } else {
            console.log(`[EMAIL LOG] To: ${email}, Subject: ${subject}`);
            console.log(`Body: ${text}`);
            console.warn('[WARN] Email not actually sent. Set EMAIL_USER and EMAIL_PASS in .env to enable real emails.');
        }
        return true;
    } catch (err) {
        console.error('Email sending failed:', err);
        return false;
    }
};

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        // Validate password strength (simple check)
        // if (password.length < 8) return res.status(400).json({ message: 'Password too short' });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user
        const confirmationToken = crypto.randomBytes(20).toString('hex');
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            emailConfirmationToken: confirmationToken,
            emailConfirmationTokenExpiry: Date.now() + 24 * 3600000,
            isEmailConfirmed: true // Auto-confirm for testing purposes
        });

        await newUser.save();

        // Send confirmation email (simulated)
        const confirmationLink = `http://localhost:5000/api/users/confirm-email/${confirmationToken}`;
        console.log(`[DEV MODE] Auto-confirmed user. Access Token would be: ${confirmationLink}`);

        res.status(201).json({ message: 'Registration successful! You can now log in.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.confirmEmail = async (req, res) => {
    try {
        const { token } = req.params;
        const user = await User.findOne({
            emailConfirmationToken: token,
            emailConfirmationTokenExpiry: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        user.isEmailConfirmed = true;
        user.emailConfirmationToken = undefined;
        user.emailConfirmationTokenExpiry = undefined;
        await user.save();

        // In a real app, maybe redirect to frontend login page
        res.redirect('http://localhost:5173/login?confirmed=true');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        if (!user.isEmailConfirmed) return res.status(400).json({ message: 'Please confirm your email first' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Email not found' });

        const resetToken = crypto.randomBytes(20).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
        await user.save();

        const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
        await sendEmail(email, 'Reset your Password', `Click to reset: ${resetLink}`);

        res.json({ message: 'Reset link sent to email' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.json({ message: 'Password reset successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
