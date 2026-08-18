const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    startYear: { type: Number },
    endYear: { type: Number },
    percentage: { type: String },
    cgpa: { type: String },
    achievements: [{ type: String }],
    coursework: [{ type: String }]
  },
  { timestamps: true }
);

module.exports = mongoose.model('Education', educationSchema);
