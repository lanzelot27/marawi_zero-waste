require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User'); // Adjust the path if needed

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Failed to connect to MongoDB", err));

// Test function
async function testPasswordCheck(email, plainTextPassword) {
    try {
        // Step 1: Find user by email
        const user = await User.findOne({ email: email });
        if (!user) {
            console.log("User not found");
            return;
        }

        console.log("Hashed password from database:", user.password);

        // **Hash the plaintext password manually** (same as registration)
        const hashedPlainPassword = await bcrypt.hash(plainTextPassword, 10);
        console.log("Manual hash of entered password:", hashedPlainPassword);

        // Check if bcrypt.compare works with the database hash
        const isMatch = await bcrypt.compare(plainTextPassword, user.password);
        
        if (isMatch) {
            console.log("Password matches!");
        } else {
            console.log("Password does NOT match.");
        }
    } catch (error) {
        console.error("Error during password check:", error);
    } finally {
        // Close the database connection
        mongoose.connection.close();
    }
}


// Call the test function with your test email and password
