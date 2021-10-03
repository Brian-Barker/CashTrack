import mongoose from 'mongoose';

const PurchaseSchema = mongoose.Schema({
    store: {
        type: String,
        required: false,
    },
    info: {
        type: String,
        required: false,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    timestamp : {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Purchase', PurchaseSchema);