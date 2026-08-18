const express = require('express');
const Skill = require('../models/Skill');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch skills', error: error.message });
  }
});

router.post('/', authMiddleware, async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create skill', error: error.message });
  }
});

module.exports = router;
