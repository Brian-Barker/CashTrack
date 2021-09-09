import express from 'express';
import Category from '../models/category.js';
import User from '../models/users.js';
import verifyToken from './auth.js';

const category = express.Router();

// --- Create Category Head (returns head) ---

category.post('/createHead', async (req, res) => {
    try {
        let token = verifyToken(req.body.token);
        if (token === false) {
            res.json({message: 'Invalid token received.'});
            return;
        }
        const user = await User.findById(token._id);

        const head = new Category({
            name: "Budget",
            budget: req.body.budget ? req.body.budget : 0,
            parent: null,
            children: [],
            user: user,
        });

        const saveHead = await head.save();

        const updateUser = await User.updateOne({_id: user._id}, { $set: { categoryHead : saveHead } });

        res.json(saveHead);
    } catch (err) {
        res.json({message: err});
    }
});

// --- Create Category With Parent (returns new Category) ---

category.post('/create', async (req, res) => {
    if (!req.body.name) {
        res.json({message: "Invalid name"});
    }
    try {
        let token = verifyToken(req.body.token);
        if (token === false) {
            res.json({message: 'Invalid token received.'});
            return;
        }
        const user = await User.findById(token._id);

        const parent = await Category.findById(req.body.parentID);

        const newCategory = new Category({
            name: req.body.name,
            budget: req.body.budget ? req.body.budget : 0,
            parent: parent,
            children: [],
            user: user,
        });

        const saveCategory = await category.save();

        const updateParent = await Category.updateOne({_id: req.body.parentID}, { $push: { children: saveCategory } });

        res.json(saveCategory);
    } catch (err) {
        res.json({message: err});
    }
});

// --- Delete Category (returns parent) ---

category.delete('/delete', async (req, res) => {
    try {
        const categoryToBeDeleted = await Category.findById(req.params.categoryID);
        if (!categoryToBeDeleted) {
            res.json({message: 'Category not found.'});
        } else if (!categoryToBeDeleted.parent) {
            res.json({message: 'Cannot delete head category.'});
        }

        const parent = await Category.findById(categoryToBeDeleted.parent._id);
        if (!parent) {
            res.json({message: 'Parent not found.'})
        }

        const updateParent = await Category.updateOne({_id: parent._id}, { $pull: { children: { _id: categoryToBeDeleted._id } } });

        const deleteCategory = await Category.deleteOne({_id: categoryToBeDeleted._id});

        res.json(updateParent);
    } catch (err) {
        res.json({message: err});
    }
});

export default category;