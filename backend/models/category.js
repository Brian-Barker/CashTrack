import mongoose from 'mongoose';

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
    },
    budget: {
        type: Number,
        required: false,
    },
    purchases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchase',
        required: false,
    }],
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    children: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    }
});

export default mongoose.model('Category', CategorySchema);