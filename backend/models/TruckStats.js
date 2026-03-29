const mongoose = require("mongoose");

const TruckStatsSchema = new mongoose.Schema({
  availableTrucks: { type: Number, default: 0 },
  tripsMade: { type: Number, default: 0 },
});

module.exports = mongoose.model("TruckStats", TruckStatsSchema);
