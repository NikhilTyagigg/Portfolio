const mongoose = require('mongoose');

const siteAnalyticsSchema = new mongoose.Schema(
  {
    page: { type: String, required: true },
    visits: { type: Number, default: 0 },
    uniqueVisitors: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

module.exports = mongoose.model('SiteAnalytics', siteAnalyticsSchema);
