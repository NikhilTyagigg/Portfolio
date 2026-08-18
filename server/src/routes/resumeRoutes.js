const express = require('express');
const multer = require('multer');
const Resume = require('../models/Resume');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resumes', error: error.message });
  }
});

router.post('/upload', authMiddleware, upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const resume = await Resume.create({
      title: req.body.title || 'Portfolio Resume',
      fileName: req.file.originalname || req.file.filename,
      fileUrl: `/uploads/${req.file.filename}`,
      uploadedBy: req.user.id
    });

    res.status(201).json({ message: 'Resume uploaded', resume });
  } catch (error) {
    res.status(500).json({ message: 'Resume upload failed', error: error.message });
  }
});

module.exports = router;
