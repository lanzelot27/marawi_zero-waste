const mongoose = require("mongoose");

const WasteStatsSchema = new mongoose.Schema({
  month: { type: Number, required: true }, // 1 = January, 2 = February, ...
  year: { type: Number, required: true },
  biodegradables: { type: Number, default: 0 },
  nonBiodegradables: { type: Number, default: 0 },
  recyclables: { type: Number, default: 0 },
  nonRecyclables: { type: Number, default: 0 },
  eWaste: { type: Number, default: 0 },
});

module.exports = mongoose.model("WasteStats", WasteStatsSchema);
