// server.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const cors = require('cors'); // Import CORS
const messageRoutes = require('./routes/auth'); 
const scheduleRoutes = require("./routes/auth");
const pointsRouter = require("./routes/auth");
const markerRouter = require("./routes/marker");
const proofRouter = require("./routes/proof");
const policyRoutes = require('./routes/policyRoutes');
const eventRoutes = require('./routes/events');
const resourcesRouter = require('./routes/resources');

const http = require('http'); // Import HTTP for Socket.IO
const { Server } = require('socket.io'); // Import Socket.IO

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // Allow requests from the frontend
        methods: ['GET', 'POST'],
    },
});

app.set('io', io); 
// Enable CORS to allow requests from the frontend
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from localhost:5173

// Parse JSON payloads
app.use(express.json());

// Routes
app.use('/api/resources', resourcesRouter);
app.use('/api/events', eventRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);
app.use("/api", pointsRouter);
app.use("/api/markers", markerRouter);
app.use("/api", proofRouter);
app.use("/api/schedules", scheduleRoutes); // Schedule routes
app.use('/uploads', express.static('uploads'));

// Socket.IO connection logic
io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Broadcast new message event
    socket.on('new-message', (message) => {
        console.log('New message received on server:', message);
        io.emit('update-messages', message); // Notify all clients
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});


// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
