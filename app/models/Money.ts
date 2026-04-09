import mongoose from "mongoose";

const moneySchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
}, { timestamps: true})

moneySchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.models.Money ||
  mongoose.model('Money', moneySchema);