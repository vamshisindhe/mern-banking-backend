import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  amount: Number,
  type: { type: String, enum: ['deposit', 'withdrawal'] },
  date: { type: Date, default: Date.now },
});

export default mongoose.model('Transaction', transactionSchema);

