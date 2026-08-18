const express = require('express');
const Experience = require('../models/Experience');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await Experience.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch experience', error: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const item = await Experience.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create experience', error: error.message });
  }
});

module.exports = router;
