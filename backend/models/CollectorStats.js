const mongoose = require("mongoose");

const CollectorStatsSchema = new mongoose.Schema({
  activeCollectors: { type: Number, default: 0 },
});

module.exports = mongoose.model("CollectorStats", CollectorStatsSchema);
