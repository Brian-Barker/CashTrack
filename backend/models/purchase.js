import mongoose from 'mongoose';

const PurchaseSchema = mongoose.Schema({
    itemCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ItemCategory',
        required: true,
    },
    amount: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Purchase', Purchase);