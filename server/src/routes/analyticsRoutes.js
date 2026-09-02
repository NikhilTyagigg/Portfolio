const express = require('express');
const SiteAnalytics = require('../models/SiteAnalytics');
const VisitorCounter = require('../models/VisitorCounter');

const router = express.Router();

const getVisitorCount = async () => {
  const counter = await VisitorCounter.findOne({ key: 'site' }).lean();
  return counter?.visits || 0;
};

router.get('/visitor-count', async (req, res) => {
  try {
    res.json({ visits: await getVisitorCount() });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch visitor count', error: error.message });
  }
});

router.post('/visitor', async (req, res) => {
  try {
    const counter = await VisitorCounter.findOneAndUpdate(
      { key: 'site' },
      { $inc: { visits: 1 } },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    ).lean();

    res.status(201).json({ visits: counter.visits });
  } catch (error) {
    res.status(500).json({ message: 'Failed to record visitor', error: error.message });
  }
});

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
