import express from 'express';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { userId, amount, type } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const newTransaction = new Transaction({ userId, amount:Number(amount), type });
    await newTransaction.save();

    user.balance += type === 'deposit' ? amount : -amount;
    await user.save();

    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:userId', async (req, res) => {
  const transactions = await Transaction.find({ userId: req.params.userId });
  res.json(transactions);
});

export default router;
