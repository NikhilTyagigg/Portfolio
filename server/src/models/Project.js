const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['Java', 'Spring Boot', 'React', 'Full Stack', 'All'], default: 'Full Stack' },
    techStack: [{ type: String }],
    githubLink: { type: String },
    liveDemo: { type: String },
    architecture: { type: String },
    features: [{ type: String }],
    screenshots: [{ type: String }],
    featured: { type: Boolean, default: false },
    views: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', projectSchema);
