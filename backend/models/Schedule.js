const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "On Progress", "Collected"],
        required: true,
    },
    waste: {
        type: String,
        enum: [
            "Biodegradables",
            "Non-Biodegradables",
            "Recyclables",
            "Non-Recyclables",
            "E-Waste",
        ],
        required: true,
    },
    schedule: {
        type: Date,
        required: true,
    },
    time: {
        type: String, // e.g., "10:00AM" or "15:00"
        required: true,
    },
    cycle: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Schedule", ScheduleSchema);
