const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ['Backend', 'Frontend', 'Database', 'Cloud', 'DevOps', 'Tools'],
      required: true
    },
    name: { type: String, required: true },
    proficiency: { type: Number, default: 85 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Skill', skillSchema);
