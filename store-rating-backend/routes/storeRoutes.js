const express = require("express");
const Store = require("../models/Store");
const router = express.Router();

// Add new store
router.post("/", async (req, res) => {
  try {
    const store = new Store({ name: req.body.name, ratings: [] });
    await store.save();
    res.status(201).json(store);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Submit a rating
router.post("/:id/rate", async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    store.ratings.push(req.body.rating);
    await store.save();
    res.json(store);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all stores with ratings
router.get("/", async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
