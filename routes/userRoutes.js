import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// --- Registration Route ---
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({
      name,
      email: email.toLowerCase().trim(),
      password: password.trim(),
    });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// --- Login Route ---
router.post('/login', async (req, res) => {
  const rawEmail = req.body.email;
  const rawPassword = req.body.password;

  const email = rawEmail?.toLowerCase().trim();
  const password = rawPassword?.trim();

  console.log("📥 Login request:");
  console.log("Email:", email);
  console.log("Password:", password);

  try {
    const user = await User.findOne({ email, password });

    console.log("🔍 User found in DB:", user);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.json(user);
  } catch (err) {
    console.error("❌ Server error during login:", err);
    res.status(500).json({ error: 'Server error' });
  }
});


export default router;


