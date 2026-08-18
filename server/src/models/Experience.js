const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true },
    role: { type: String, required: true },
    duration: { type: String, required: true },
    responsibilities: [{ type: String }],
    techStack: [{ type: String }],
    keyAchievements: [{ type: String }],
    type: { type: String, enum: ['American Express', 'Contract', 'Freelance'], default: 'JOB' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Experience', experienceSchema);
