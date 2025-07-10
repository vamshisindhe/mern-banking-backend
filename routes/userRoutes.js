import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// User Login with proper error handling
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Check for empty fields
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find user with matching credentials
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Return user if found
    res.json(user);
  } catch (err) {
    // Log exact error to server logs
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
