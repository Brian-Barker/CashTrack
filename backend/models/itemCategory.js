import mongoose from 'mongoose';

const ItemCategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    budget: {
        type: Number,
        required: false,
    },
    purchases: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Purchase'
    }],
    parent: [ this ],
    children: [ this ],
});

export default mongoose.model('ItemCategory', ItemCategory);