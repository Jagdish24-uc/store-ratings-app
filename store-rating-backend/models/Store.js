const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ratings: [{ type: Number }],
});

// Calculate average rating automatically
storeSchema.virtual("averageRating").get(function () {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((a, b) => a + b, 0);
  return (sum / this.ratings.length).toFixed(1);
});

module.exports = mongoose.model("Store", storeSchema);
