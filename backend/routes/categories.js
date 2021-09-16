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
        console.log("Error: No name provided")
        res.json({message: "Error: No name provided"});
    } else if (!req.body.parentID) {
        console.log("Error: No parentID provided")
        re.json({message: "Error: No parentID provided"})
    }
    try {
        let token = verifyToken(req.body.token);
        if (token === false) {
            res.json({message: 'Invalid token received.'});
            return;
        }
        const user = await User.findById(token._id, (err, usr) => {
            if (err) {
                console.log(err);
                res.send({message: "Error while parsing user token."});
            }
            if (!usr) {
                console.log("Error: No user found with provided token");
                res.send({message: "Error while parsing user token."});
            }
        });
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

        const updateParent = await Category.findByIdAndUpdate(parent._id, {
            $pull: { children: req.body.categoryID }
        });

        new Promise((resolve, reject) => {
            deleteCategoryAndChildren(categoryToBeDeleted._id, resolve, reject)
        }).then(() => { // Success
            res.json(updateParent);
        }).catch(() => { // Failure
            res.json({message: 'Error: Failed to delete category and/ or children'});
        })
    } catch (err) {
        console.log(err);
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
        rej();
    }

}

// -- Category Updates --

category.post('/update/*', async (req, res, next) => {
    if (!req.body.categoryID) {
        console.log("Error: No categoryID provided");
        res.json({message: "Error: No category specified"});
    } else {
        next();
    }
});

// -- Rename --

category.post('/update/rename', async (req, res) => {
    if (!req.body.name) {
        console.log("Error: No name provided");
        res.json({message: "Error: No name provided"});
    } else {
        try {
            const renameCategory = await Category.findByIdAndUpdate(req.body.categoryID, { name: req.body.name });
            res.json(renameCategory);
        } catch (err) {
            console.log(err);
            res.json({message: err});
        }
    }
});

// -- Change Budget

category.post('/update/changeBudget', async (req, res) => {
    if (!req.body.budget) {
        console.log("Error: No budget provided");
        res.json({message: "Error: No budget provided"});
    } else {
        try {
            let amount = Math.round(req.body.budget * 100) / 100;
            if (amount < 0) {
                res.json({message: "Budget cannot be negative."});
            }
            const changeCategoryBudget = await Category.findByIdAndUpdate(req.body.categoryID, { budget: amount });
            res.json(changeCategoryBudget);
        } catch (err) {
            console.log(err);
            res.json({message: err});
        }
    }
});

// -- Add Purchase

category.post('/update/addPurchase', async (req, res) => {
    if (!req.body.purchaseID) {
        console.log("Error: No purchaseID provided");
        res.json({message: "Error: No purchase provided"});
    } else {
        try {
            const addPurchaseToCategory = await Category.findByIdAndUpdate(req.body.categoryID, { $push: { purchases: req.body.purchaseID } });
            res.json(addPurchaseToCategory);
        } catch (err) {
            console.log(err);
            res.json({message: err});
        }
    }
});

// -- Remove Purchase

category.post('/update/removePurchase', async (req, res) => {
    if (!req.body.purchaseID) {
        console.log("Error: No purchaseID provided");
        res.json({message: "Error: No purchase provided"});
    } else {
        try {
            const addPurchaseToCategory = await Category.findByIdAndUpdate(req.body.categoryID, { $push: { purchases: req.body.purchaseID } });
            res.json(addPurchaseToCategory);
        } catch (err) {
            console.log(err);
            res.json({message: err});
        }
    }
});

const categoryExports = {
    categoryRoutes: category,
    createHeader
};
export default categoryExports;