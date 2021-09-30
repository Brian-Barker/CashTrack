import mongoose from 'mongoose';

const PurchaseSchema = mongoose.Schema({
    store: {
        type: String,
        required: false,
    }
    info: {
        type: String,
        required: false,
    }
    category: {
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