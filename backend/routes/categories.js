import express from 'express';
import Category from '../models/category.js';
import User from '../models/users.js';
import verifyToken from './auth.js';

const category = express.Router();

// --- Create Category Head (returns head) ---

const createHeader = async (user) => {
    try {
        const head = new Category({
            name: "Budget",
            budget: 0,
            parent: null,
            user: user,
        });

        const saveHead = await head.save();

        const updateUser = await User.updateOne({_id: user._id}, { $set: { categoryHead : saveHead } })

        return saveHead;
    } catch (err) {
        console.log(err)
        return err;
    }
};

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
        let parent;
        if (req.body.parentID) {
            parent = await Category.findById(req.body.parentID);
        } else {    // -- Default adds Category as child of Head, if no parent is specified
            parent = await Category.findById(user.categoryHead);
        }

        const newCategory = new Category({
            name: req.body.name,
            budget: req.body.budget ? req.body.budget : 0,
            parent: parent,
            user: user,
        });

        const saveCategory = await newCategory.save();

        const updateParent = await Category.updateOne({_id: parent._id}, { $push: { children: saveCategory } });

        res.json(saveCategory);
    } catch (err) {
    console.log(err)
        res.json({message: err});
    }
});

// --- Delete Category (returns parent) ---

category.delete('/delete', async (req, res) => {
    try {
        const categoryToBeDeleted = await Category.findById(req.body.categoryID);

        const parent = await Category.findById(categoryToBeDeleted.parent._id);
        if (!parent) {
            res.json({message: 'Parent not found.'})
        }

        const updateParent = await Category.updateOne({_id: parent._id}, {
            $pull: { children: { _id: categoryToBeDeleted._id } }
        });

        new Promise((resolve, reject) => {
            deleteCategoryAndChildren(categoryToBeDeleted._id, resolve, reject)
        }).then(() => { // Success
            res.json(updateParent);
        }).catch(() => { // Failure
            res.json({message: 'Error: Failed to delete category and/ or children'});
        })
    } catch (err) {
        res.json({message: err});
    }
});

// --- Helper Function to Recursively Delete a Category and its Children ---

const deleteCategoryAndChildren = async (categoryID, res, rej) => {
    try {
        const categoryToBeDeleted = await Category.findById(categoryID);

        if (!categoryToBeDeleted)
            res();

        let promises = [];

        if (categoryToBeDeleted.children) {
            categoryToBeDeleted.children.forEach((child) => {
                promises.push(new Promise((resolve, reject) => {
                    if(deleteCategoryAndChildren(child, resolve, reject) === -1) {
                        rej();
                    }
                }));
            });
        }

        Promise.all(promises).then(async () => {
            const deleteCategory = await Category.deleteOne({_id: categoryID}, (err) => {
                if (err) {
                    console.log(err);
                    rej();
                }
            });
            res();
        }).catch(() => rej());

    } catch (err) {
        console.log(err);
    }

}


const categoryExports = {
    categoryRoutes: category,
    createHeader
};
export default categoryExports;