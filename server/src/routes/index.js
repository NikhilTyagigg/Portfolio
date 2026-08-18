const express = require('express');
const authRoutes = require('./authRoutes');
const contactRoutes = require('./contactRoutes');
const projectRoutes = require('./projectRoutes');
const githubRoutes = require('./githubRoutes');
const resumeRoutes = require('./resumeRoutes');
const analyticsRoutes = require('./analyticsRoutes');
const educationRoutes = require('./educationRoutes');
const experienceRoutes = require('./experienceRoutes');
const skillRoutes = require('./skillRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/contact', contactRoutes);
router.use('/projects', projectRoutes);
router.use('/github', githubRoutes);
router.use('/resume', resumeRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/education', educationRoutes);
router.use('/experience', experienceRoutes);
router.use('/skills', skillRoutes);

module.exports = router;
