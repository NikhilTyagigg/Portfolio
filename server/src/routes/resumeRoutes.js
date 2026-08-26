const express = require('express');
const path = require('path');
const multer = require('multer');
const Resume = require('../models/Resume');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });
const defaultResume = {
  title: 'Nikhil Tyagi Resume',
  fileName: 'Nikhil_Tyagi_Resume.pdf',
  fileUrl: '/uploads/Nikhil_Tyagi_Resume.pdf'
};

router.get('/', async (req, res) => {
  try {
    const resumes = await Resume.find().sort({ createdAt: -1 });
    res.json(resumes.length ? resumes : [defaultResume]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch resumes', error: error.message });
  }
});

router.get('/:id/file', async (req, res) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume?.fileUrl) {
      return res.status(404).json({ message: 'Resume file not found' });
    }

    res.type(path.extname(resume.fileName || '.pdf') || '.pdf');
    return res.sendFile(path.resolve(__dirname, '../../', resume.fileUrl.replace(/^\/+/, '')));
  } catch (error) {
    return res.status(404).json({ message: 'Resume file not found' });
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
