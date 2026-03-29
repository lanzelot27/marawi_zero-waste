// routes/auth.js
const express = require('express');
const auth = require('../middleware/authMW');
const upload = require('../middleware/multerMW');
const User = require('../models/User'); // Adjust path if needed
const Feedback = require('../models/Feedback');
const CommunityMessage = require('../models/CommunityMessage');
const AdminMessage = require('../models/AdminMessage');
const UserPoints = require("../models/UserPoints");
const Schedule = require("../models/Schedule");
const CollectorStats = require("../models/CollectorStats");
const TruckStats = require("../models/TruckStats");
const WasteStats = require("../models/WasteStats");
const { register, login, getUserProfile, changePassword, updateUserProfile } = require('../controllers/authController'); // Import new function
const router = express.Router();
const fs = require('fs')

router.get('/community', auth, (req, res) => {
    res.status(200).json({ message: 'Welcome to the Community page!' });
});
router.get('/admin', auth, (req, res) => {
    res.status(200).json({ message: 'Welcome to the Admin page!' });
});

router.post('/register', register);
router.post('/login', login);

// Add the new profile route
router.get('/me', auth, getUserProfile);
router.put('/change-password', auth, changePassword);
router.put('/update-profile', auth, updateUserProfile);
// WASTE-STATS ROUTES
router.get("/waste-stats", async (req, res) => {
    try {
      const { month, year } = req.query;
      const wasteStats = await WasteStats.findOne({ month, year });
  
      if (!wasteStats) {
        return res.status(404).json({
          biodegradables: 0,
          nonBiodegradables: 0,
          recyclables: 0,
          nonRecyclables: 0,
          eWaste: 0,
        });
      }
  
      res.status(200).json(wasteStats);
    } catch (error) {
      console.error("Error fetching waste stats:", error);
      res.status(500).json({ message: "Server error." });
    }
  });
  
  router.put("/waste-stats", async (req, res) => {
    try {
      const { month, year, ...wasteData } = req.body;
  
      const updatedStats = await WasteStats.findOneAndUpdate(
        { month, year },
        wasteData,
        { new: true, upsert: true }
      );
  
      res.status(200).json(updatedStats);
    } catch (error) {
      console.error("Error updating waste stats:", error);
      res.status(500).json({ message: "Server error." });
    }
  });
  
  // COLLECTORS ROUTES
  router.get("/collectors", async (req, res) => {
    try {
      const collectorStats = await CollectorStats.findOne();
  
      if (!collectorStats) {
        return res.status(404).json({ activeCollectors: 0 });
      }
  
      res.status(200).json(collectorStats);
    } catch (error) {
      console.error("Error fetching collector stats:", error);
      res.status(500).json({ message: "Server error." });
    }
  });
  
  router.put("/collectors", async (req, res) => {
    try {
      const { activeCollectors } = req.body;
  
      const updatedStats = await CollectorStats.findOneAndUpdate(
        {},
        { activeCollectors },
        { new: true, upsert: true }
      );
  
      res.status(200).json(updatedStats);
    } catch (error) {
      console.error("Error updating collector stats:", error);
      res.status(500).json({ message: "Server error." });
    }
  });
  
  // TRUCKS ROUTES
  router.get("/trucks", async (req, res) => {
    try {
      const truckStats = await TruckStats.findOne();
  
      if (!truckStats) {
        return res.status(404).json({ availableTrucks: 0, tripsMade: 0 });
      }
  
      res.status(200).json(truckStats);
    } catch (error) {
      console.error("Error fetching truck stats:", error);
      res.status(500).json({ message: "Server error." });
    }
  });
  
  router.put("/trucks", async (req, res) => {
    try {
      const { availableTrucks, tripsMade } = req.body;
  
      const updatedStats = await TruckStats.findOneAndUpdate(
        {},
        { availableTrucks, tripsMade },
        { new: true, upsert: true }
      );
  
      res.status(200).json(updatedStats);
    } catch (error) {
      console.error("Error updating truck stats:", error);
      res.status(500).json({ message: "Server error." });
    }
  });
  
  // OTHER EXISTING ROUTES (NO CHANGES)

router.put('/upload-profile-pic', auth, upload.single('profilePic'), async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Delete the old profile picture if it exists and is not the default one
        if (user.profilePic && user.profilePic !== '/uploads/default-avatar.jpg') {
            const fs = require('fs');
            const oldPath = `.${user.profilePic}`;
            fs.unlink(oldPath, (err) => {
                if (err) console.error('Error deleting old profile picture:', err);
            });
        }

        // Update the user's profile picture path
        user.profilePic = `/uploads/${req.file.filename}`;
        await user.save();

        res.status(200).json({ message: 'Profile picture uploaded successfully.', profilePic: user.profilePic });
    } catch (error) {
        console.error('Error uploading profile picture:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

// Fetch all waste collectors
router.get('/waste-collectors', auth, async (req, res) => {
    try {
        // Fetch all users with userType "Waste Collector"
        const wasteCollectors = await User.find({ userType: 'Collector' }).select('-password'); // Exclude password
        res.status(200).json(wasteCollectors);
    } catch (error) {
        console.error("Error fetching waste collectors:", error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

router.get('/community-accounts', auth, async (req, res) => {
    try {
        
        const Community = await User.find({ userType: 'Community' }).select('-password'); // Exclude password
        res.status(200).json(Community);
    } catch (error) {
        console.error("Error fetching community:", error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});
router.delete('/delete-collector/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the URL
        const deletedCollector = await User.findByIdAndDelete(id); // Delete the collector by ID
        if (!deletedCollector) {
            return res.status(404).json({ message: 'Collector not found.' });
        }
        res.status(200).json({ message: 'Collector deleted successfully.' });
    } catch (error) {
        console.error('Error deleting collector:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});
router.delete('/delete-community-account/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract the ID from the URL
        const deletedCommunity = await User.findByIdAndDelete(id); // Delete the collector by ID
        if (!deletedCommunity) {
            return res.status(404).json({ message: 'Community user not found.' });
        }
        res.status(200).json({ message: 'Community user deleted successfully.' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});

router.put('/update-community-account/:id', auth, async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Find the account to update
        const account = await User.findById(req.params.id);

        if (!account || account.userType !== 'Community') {
            return res.status(404).json({ message: 'Account not found or invalid userType' });
        }

        // Update fields
        account.firstName = firstName;
        account.lastName = lastName;
        account.email = email;

        // Update password only if provided
        if (password) {
            account.password = password;
        }

        await account.save();
        res.status(200).json({ message: 'Community account updated successfully' });
    } catch (error) {
        console.error('Error updating community account:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put('/update-collector/:id', auth, async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Find the account to update
        const account = await User.findById(req.params.id);

        if (!account || account.userType !== 'Collector') {
            return res.status(404).json({ message: 'Account not found or invalid userType' });
        }

        // Update fields
        account.firstName = firstName;
        account.lastName = lastName;
        account.email = email;

        // Update password only if provided
        if (password) {
            account.password = password;
        }

        await account.save();
        res.status(200).json({ message: 'Collector updated successfully' });
    } catch (error) {
        console.error('Error updating collector account:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/feedback', auth, async (req, res) => {
    const { emoji, feedbackText } = req.body;

    if (!emoji || !feedbackText) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const feedback = new Feedback({
            emoji,
            feedbackText,
            user: req.user.userId, // Assuming the user is authenticated
        });

        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully.' });
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

router.get('/feedback', auth, async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('user', 'firstName lastName email');
        res.status(200).json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

router.delete('/feedback/:id', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const feedback = await Feedback.findByIdAndDelete(id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found.' });
        }
        res.status(200).json({ message: 'Feedback deleted successfully.' });
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});

// Route to send a message
// POST /api/messages
// router.post('/messages', auth, async (req, res) => {
//     try {
//         const { message, senderType } = req.body;

//         // Validate the request body
//         if (!message || !senderType) {
//             return res.status(400).json({ message: 'Message and senderType are required.' });
//         }

//         // Create and save a new message
//         const newMessage = new Message({
//             userIdm: req.user.userId, // Ensure user ID is set from the auth middleware
//             message,
//             senderType,
//         });
        
//         await newMessage.save();

//         res.status(201).json(newMessage); // Respond with the created message
//     } catch (error) {
//         console.error('Error saving message:', error);
//         res.status(500).json({ message: 'Failed to send message.' });
//     }
// });

// Fetch user messages using token (no userId needed in URL)
    // router.get('/messages', auth, async (req, res) => {
    //     try {
    //         const userIdm = req.user.userId; // Get userId from the token payload
    //         const messages = await Message.find({ userIdm }).sort({ createdAt: 1 });
    //         res.status(200).json(messages);
    //     } catch (error) {
    //         console.error('Error fetching messages:', error);
    //         res.status(500).json({ message: 'Server error. Please try again later.' });
    //     }
    // });

    router.get('/all-community-messages', auth, async (req, res) => {
        try {
            const communityMessages = await CommunityMessage.aggregate([
                { $sort: { createdAt: -1 } },
                {
                    $group: {
                        _id: '$comuserId', // Changed from userId to comuserId
                        latestMessage: { $first: '$message' },
                        latestTimestamp: { $first: '$createdAt' },
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'userInfo',
                    },
                },
                {
                    $project: {
                        userIdm: '$_id',
                        latestMessage: 1,
                        latestTimestamp: 1,
                        name: { $arrayElemAt: ['$userInfo.firstName', 0] },
                        email: { $arrayElemAt: ['$userInfo.email', 0] },
                    },
                },
            ]);
    
            res.status(200).json(communityMessages);
        } catch (error) {
            console.error('Error fetching community users:', error);
            res.status(500).json({ message: 'Server error' });
        }
    });
    
    
// Add Community Message
router.post('/community-messages', auth, async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ message: 'Message is required.' });

        const newMessage = new CommunityMessage({
            comuserId: req.user.userId, // Changed from userId to comuserId
            message,
        });

        await newMessage.save();
        const io = req.app.get('io');
        io.emit('update-messages', newMessage);
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error saving community message:', error);
        res.status(500).json({ message: 'Failed to save community message.' });
    }
});


// Fetch Community Messages for a User
router.get('/community-messages', auth, async (req, res) => {
    try {
        const comuserId = req.user.userId; // Changed from userId to comuserId
        const messages = await CommunityMessage.find({ comuserId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching community messages:', error);
        res.status(500).json({ message: 'Failed to fetch community messages.' });
    }
});


// Add Admin Message (Reply)
router.post('/admin-messages', auth, async (req, res) => {
    try {
        const { message, communityUserId } = req.body;
        if (!message || !communityUserId) {
            return res.status(400).json({ message: 'Message and communityUserId are required.' });
        }

        const newMessage = new AdminMessage({
            communityUserId,
            message,
        });

        await newMessage.save();

        const io = req.app.get('io');
        io.emit('update-messages', newMessage);
        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error saving admin message:', error);
        res.status(500).json({ message: 'Failed to save admin message.' });
    }
});

// Fetch Admin Messages for a Community User
router.get('/admin-messages/:communityUserId', auth, async (req, res) => {
    try {
        const { communityUserId } = req.params;
        const messages = await AdminMessage.find({ communityUserId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching admin messages:', error);
        res.status(500).json({ message: 'Failed to fetch admin messages.' });
    }
});

router.get('/community-messages/:comuserId', auth, async (req, res) => {
    try {
        const { comuserId } = req.params; // Changed from userId to comuserId
        const messages = await CommunityMessage.find({ comuserId }).sort({ createdAt: 1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error('Error fetching community messages by comuserId:', error);
        res.status(500).json({ message: 'Failed to fetch community messages.' });
    }
});


router.get('/messages/community', auth, async (req, res) => {
    try {
        const comuserId = req.user.userId;

        // Fetch community and admin messages
        const [communityMessages, adminMessages] = await Promise.all([
            CommunityMessage.find({ comuserId }).sort({ createdAt: 1 }),
            AdminMessage.find({ communityUserId: comuserId }).sort({ createdAt: 1 }),
        ]);

        // Combine and sort by createdAt
        const allMessages = [...communityMessages, ...adminMessages].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );

        res.status(200).json(allMessages);
    } catch (error) {
        console.error('Error fetching community and admin messages:', error);
        res.status(500).json({ message: 'Failed to fetch messages.' });
    }
});

router.delete('/messages/:communityUserId', auth, async (req, res) => {
    try {
        const { communityUserId } = req.params;

        // Delete community and admin messages associated with the user
        await CommunityMessage.deleteMany({ comuserId: communityUserId });
        await AdminMessage.deleteMany({ communityUserId });

        res.status(200).json({ message: 'Messages deleted successfully.' });
    } catch (error) {
        console.error('Error deleting messages:', error);
        res.status(500).json({ message: 'Failed to delete messages.' });
    }
});

// router.get('/messages/:userIdm', auth, async (req, res) => {
//     try {
//         const { userIdm } = req.params;
//         const messages = await Message.find({ userIdm }).sort({ createdAt: 1 }); // Sort messages chronologically
//         res.status(200).json(messages);
//     } catch (error) {
//         console.error('Error fetching messages by userId:', error);
//         res.status(500).json({ message: 'Server error. Please try again later.' });
//     }
// });

// GET all schedules
router.get("/", async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.status(200).json(schedules);
    } catch (error) {
        console.error("Error fetching schedules:", error);
        res.status(500).json({ message: "Server error." });
    }
});

// POST a new schedule
router.post("/", async (req, res) => {
    try {
        const { location, status, waste, schedule, time, cycle } = req.body;

        // Validation
        if (!location || !status || !waste || !schedule || !time || !cycle) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Validate time format
        if (!/^\d{2}:\d{2}$/.test(time)) {
            return res.status(400).json({ message: "Invalid time format. Use HH:mm (24-hour format)." });
        }

        // Validate schedule format and parse it
        const parsedSchedule = new Date(schedule);
        if (isNaN(parsedSchedule.getTime())) {
            return res.status(400).json({ message: "Invalid schedule format. Use YYYY-MM-DD." });
        }

        const newSchedule = new Schedule({
            location,
            status,
            waste,
            schedule: parsedSchedule, // Store parsed Date object
            time,
            cycle,
        });

        await newSchedule.save();
        res.status(201).json(newSchedule);
    } catch (error) {
        console.error("Error creating schedule:", error);
        res.status(500).json({ message: "Server error." });
    }
});


// PUT (update) a schedule by ID
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { schedule, time, ...otherFields } = req.body;

        // Convert schedule to a valid Date object
        const updatedData = {
            ...otherFields,
            ...(schedule && { schedule: new Date(schedule) }),
            ...(time && { time }),
        };

        // Validate time format (Optional)
        if (time && !/^\d{2}:\d{2}$/.test(time)) {
            return res.status(400).json({ message: "Invalid time format. Use HH:mm (24-hour format)." });
        }

        const updatedSchedule = await Schedule.findByIdAndUpdate(
            id,
            updatedData,
            { new: true }
        );

        if (!updatedSchedule) {
            return res.status(404).json({ message: "Schedule not found." });
        }

        res.status(200).json(updatedSchedule);
    } catch (error) {
        console.error("Error updating schedule:", error);
        res.status(500).json({ message: "Server error." });
    }
});


// DELETE a schedule by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deletedSchedule = await Schedule.findByIdAndDelete(id);

        if (!deletedSchedule) {
            return res.status(404).json({ message: "Schedule not found." });
        }

        res.status(200).json({ message: "Schedule deleted successfully." });
    } catch (error) {
        console.error("Error deleting schedule:", error);
        res.status(500).json({ message: "Server error." });
    }
});

// GET all community users with points
router.get("/points", async (req, res) => {
    try {
        const communityUsers = await User.find({ userType: "Community" });
        const userPoints = await UserPoints.find();

        const usersWithPoints = communityUsers.map(user => {
            const userPoint = userPoints.find(point => point.userId.toString() === user._id.toString());
            return {
                id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                points: userPoint ? userPoint.points : 0,
            };
        });

        res.status(200).json(usersWithPoints);
    } catch (error) {
        console.error("Error fetching users and points:", error);
        res.status(500).json({ message: "Server error." });
    }
});

// Update points for a specific user
router.put("/points/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        const { points } = req.body;

        const userPoint = await UserPoints.findOneAndUpdate(
            { userId },
            { $inc: { points } },
            { new: true, upsert: true }
        );

        res.status(200).json(userPoint);
    } catch (error) {
        console.error("Error updating points:", error);
        res.status(500).json({ message: "Server error." });
    }
});

router.get('/points/me', auth, async (req, res) => {
    try {
        const userId = req.user.userId; // Ensure `req.user` contains the `userId`

        // Fetch user and points data in parallel
        const [user, userPoints] = await Promise.all([
            User.findById(userId), // Fetch user by ID
            UserPoints.findOne({ userId }), // Fetch points by userId
        ]);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Respond with user's points
        res.status(200).json({
            firstName: user.firstName,
            lastName: user.lastName,
            points: userPoints ? userPoints.points : 0, // Default to 0 if no points
        });
    } catch (error) {
        console.error('Error fetching user points:', error);
        res.status(500).json({ message: 'Server error.' });
    }
});



module.exports = router;