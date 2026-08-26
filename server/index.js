const express = require('express');
const path = require('path');
const nodeCrypto = require('node:crypto');
global.crypto = nodeCrypto;
const { randomBytes, pbkdf2Sync, timingSafeEqual } = nodeCrypto;
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const apiRoutes = require('./src/routes');
const User = require('./src/models/User');

dotenv.config();

const hashPassword = (password) => {
  const salt = randomBytes(16).toString('hex');
  const hash = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  return `${salt}:${hash}`;
};

const comparePassword = (password, storedHash) => {
  if (!storedHash || typeof storedHash !== 'string' || !storedHash.includes(':')) {
    return false;
  }

  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) {
    return false;
  }

  const derivedHash = pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
  try {
    return timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(derivedHash, 'hex'));
  } catch (error) {
    return false;
  }
};

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || '*', credentials: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
  res.json({ message: 'Portfolio API is running.' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

const seedAdminUser = async () => {
  const email = process.env.ADMIN_EMAIL || 'admin@portfolio.local';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const hashedPassword = hashPassword(password);
      await User.create({
        name: 'Portfolio Admin',
        email,
        password: hashedPassword,
        role: 'admin'
      });
      console.log(`Seeded admin user: ${email}`);
    }
  } catch (error) {
    console.error('Failed to seed admin user:', error.stack || error.message);
  }
};

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio')
  .then(async () => {
    console.log('MongoDB connected');
    await seedAdminUser();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

module.exports = app;
