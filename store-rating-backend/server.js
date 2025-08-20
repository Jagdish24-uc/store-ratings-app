import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Store Schema
const storeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  ratings: [{ type: Number }],
});

// Virtual field: averageRating
storeSchema.virtual("averageRating").get(function () {
  if (this.ratings.length === 0) return 0;
  return this.ratings.reduce((a, b) => a + b, 0) / this.ratings.length;
});

storeSchema.set("toJSON", { virtuals: true });

const Store = mongoose.model("Store", storeSchema);

// ✅ API Routes

// 1. Get all stores
app.get("/api/stores", async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch stores" });
  }
});

// 2. Add a new store
app.post("/api/stores", async (req, res) => {
  try {
    const { name, location } = req.body;
    const newStore = new Store({ name, location, ratings: [] });
    await newStore.save();
    res.json(newStore);
  } catch (err) {
    res.status(500).json({ error: "Failed to add store" });
  }
});

// 3. Add rating for a store
app.post("/api/stores/:id/rate", async (req, res) => {
  try {
    const { rating } = req.body;
    const store = await Store.findById(req.params.id);
    if (!store) return res.status(404).json({ error: "Store not found" });

    store.ratings.push(rating);
    await store.save();

    res.json(store);
  } catch (err) {
    res.status(500).json({ error: "Failed to add rating" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
