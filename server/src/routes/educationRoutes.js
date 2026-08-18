const express = require('express');
const Education = require('../models/Education');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const data = await Education.find().sort({ startYear: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch education', error: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const item = await Education.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create education record', error: error.message });
  }
});

module.exports = router;
