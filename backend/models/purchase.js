import mongoose from 'mongoose';

const PurchaseSchema = mongoose.Schema({
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    amount: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Purchase', Purchase);