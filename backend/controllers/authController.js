// controllers/authController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    const { 
        userType, 
        firstName, 
        lastName, 
        province, 
        city, 
        barangay, 
        email, 
        password, 
        confirmPassword, 
        termsAccepted 
    } = req.body;

    // Check for required fields
    if (!firstName || !lastName || !province || !city || !barangay || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match' });
    }

    // Ensure terms are accepted
    if (!termsAccepted) {
        return res.status(400).json({ message: 'You must accept the terms and conditions' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // Encrypt password (you can use bcrypt here)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ 
            userType,
            firstName, 
            lastName, 
            province, 
            city, 
            barangay, 
            email, 
            password: hashedPassword, // Store the hashed password
            termsAccepted // Save the terms acceptance in the database
        });

        // Save the new user
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found with email:", email);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log("User found, checking password...");
        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password match status:", isMatch); // Add this line to see if password comparison passes

        if (!isMatch) {
            console.log("Password comparison failed.");
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token, userType: user.userType });
        
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Exclude password
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName, // If you have this field
            province: user.province,
            city: user.city,
            barangay: user.barangay,
            email: user.email,
            profilePic: user.profilePic
        });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Both current and new passwords are required.' });
    }

    try {
        // Find the logged-in user
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if the current password matches the one in the database
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect.' });
        }

        // Update the user's password
        user.password = newPassword; // The pre-save hook will hash it
        await user.save();

        res.status(200).json({ message: 'Password updated successfully.' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

exports.updateUserProfile = async (req, res) => {
    const { firstName, lastName, province, city, barangay, email } = req.body;

    if (!firstName || !lastName || !province || !city || !barangay || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Retrieve user ID from the auth middleware
        const user = await User.findById(req.user.userId);

        // Find the user by ID and update the profile
        const updatedUser = await User.findByIdAndUpdate(
            user,
            { firstName, lastName, province, city, barangay, email }, // Only update these fields
            { new: true, runValidators: true } // Return the updated document and validate inputs
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser); // Return updated user details
    } catch (error) {
        console.error("Error updating user profile:", error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};


