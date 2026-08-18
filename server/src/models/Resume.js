const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    title: { type: String, default: 'Nikhil Tyagi Resume' },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    atsScore: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Resume', resumeSchema);
