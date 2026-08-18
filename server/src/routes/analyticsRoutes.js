const express = require('express');
const SiteAnalytics = require('../models/SiteAnalytics');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const analytics = await SiteAnalytics.find().sort({ createdAt: -1 }).limit(30);
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch analytics', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { page, visits, uniqueVisitors } = req.body;
    const entry = await SiteAnalytics.create({ page, visits, uniqueVisitors });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: 'Failed to save analytics', error: error.message });
  }
});

module.exports = router;
