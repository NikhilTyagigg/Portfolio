const mongoose = require('mongoose');

const visitorCounterSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, default: 'site' },
    visits: { type: Number, default: 0 }
  },
  { timestamps: true }
);

module.exports = mongoose.model('VisitorCounter', visitorCounterSchema);
