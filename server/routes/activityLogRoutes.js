// routes/activityLogRoutes.js
const express = require("express");
const router = express.Router();
const ActivityLog = require("../models/ActivityLog");

// Save new log
router.post("/", async (req, res) => {
  try {
    const log = await ActivityLog.create({
      adminname: req.admin.name,
      action: req.body.action
    });
    
    res.json(log);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all logs
router.get("/", async (req, res) => {
  try {
    const logs = await ActivityLog.find().sort({ time: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
