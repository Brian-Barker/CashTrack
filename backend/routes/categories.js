import express from 'express';
import Purchase from '../models/purchases.js';
import Category from '../models/category.js';
import User from '../models/users.js';
import verifyToken from './auth.js';

const category = express.Router();

category.use('/', async (req, res, next) => {
    try {
        let token = verifyToken(req.body.token);
        if (token === false) {
            throw 'Error: Invalid token provided';
        }
        res.locals.token = token;

        if (req.body.parentId) {
            const parent = await Category.findById(req.body.parentId);

            if (parent.user != token._id) throw 'Error: parent specified does not belong to user';
            res.locals.parent = parent;
        }

        if (req.body.categoryId) {
            const category = await Category.findById(req.body.categoryId);

            if (category.user != token._id) throw 'Error: category specified does not belong to user';
            res.locals.category = category;
        }

    } catch(err) {
        console.error(err);
        res.json({error: err});
    }
});

// --- Create Category Head (returns head) To be called as user is created ---

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
// token
// name
// parentId
// budget
category.post('/create', async (req, res) => {
    if (!req.body.name) {
        console.log("Error: No name provided")
        res.json({message: "Error: No name provided"});
    } else if (!req.body.parentId) {
        console.log("Error: No parentId provided")
        re.json({message: "Error: No parentId provided"})
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
        if (req.body.parentId) {
            parent = await Category.findById(req.body.parentId);
        } else {    // Default adds Category as child of Head, if no parent is specified
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
// token
// categoryId
category.delete('/', async (req, res) => {
    try {
        const categoryToBeDeleted = await Category.findById(req.body.categoryId);

        const parent = await Category.findById(categoryToBeDeleted.parent._id);
        if (!parent) {
            res.json({message: 'Parent not found.'})
        }

        const updateParent = await Category.findByIdAndUpdate(parent._id, {
            $pull: { children: req.body.categoryId }
        });

        new Promise((resolve, reject) => {
            deleteCategoryAndChildren(parent._id, categoryToBeDeleted._id, resolve, reject)
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

const deleteCategoryAndChildren = async (topParentId, categoryId, res, rej) => {
    try {
        const categoryToBeDeleted = await Category.findById(categoryId);

        if (!categoryToBeDeleted)
            res();

        let promises = [];

        if (categoryToBeDeleted.children) {
            categoryToBeDeleted.children.forEach((child) => {
                promises.push(new Promise((resolve, reject) => {
                    if(deleteCategoryAndChildren(topParentId, child, resolve, reject) === -1) {
                        rej();
                    }
                }));
            });
        }

        Promise.all(promises).then(async () => {
            const updateTopParent = await Category.updateOne({_id: topParentId}, {
                $push: { purchases: { $each: categoryToBeDeleted.purchases } }
            });

            categoryToBeDeleted.purchases.forEach(purchase => {
                Purchase.findByIdAndUpdate(purchase._id,
                    { category: topParentId },
                    (err) => { if (err) throw err;
                });
            });

            const deleteCategory = await Category.deleteOne({_id: categoryId}, (err) => {
                if (err) throw err;
            });
            res();
        });

    } catch (err) {
        console.log(err);
        rej();
    }

}

// -- Get category and children from _id --
// token
// categoryId
category.post('/getChildren', async (req, res) => {
    if (!req.body.categoryId) {
        console.log("Error: No categoryId provided");
        res.json({message: "Error: No category specified"});
    } else {
        try {
            const categories = await getChildren(req.body.categoryId);
            res.json(categories);
        } catch (err) {
            console.log(err)
            res.json({message: err});
        }
    }
});

// -- Helper function to get all children of category from _id --

const getChildren = async (categoryId, resolve, reject) => {
    try {
        const parent = await Category.findById(categoryId);
        if (!parent.children || parent.children.length === 0) {
            if (resolve) { resolve({ category: parent, childCategories: null }) }
            return { category: parent, children: null };
        } else {
            let childrenPromises = [];
            parent.children.forEach( (childId) => {
                childrenPromises.push(new Promise((res, rej) => {
                    getChildren(childId, res, rej);
                }));
            });

            const family = await Promise.all(childrenPromises).then((children) => {
                return { category: parent, childCategories: children };
            }).catch((err) => {
                console.log(err)
                if (reject) { reject() }
                return null
            });
            if (resolve) resolve(family);
            else return family;
        }
    } catch (err) {
        console.log(err);
        return null;
    }

}

// -- Get one category from _id --
// token
// categoryId
category.post('/getOne', async (req, res) => {
    if (!req.body.categoryId) {
        console.log("Error: No categoryId provided");
        res.json({message: "Error: No category specified"});
    } else {
        try {
            const category = await Category.findById(req.body.categoryId);
            res.json(category);
        } catch (err) {
            console.log(err);
            res.json({message: err});
        }
    }
});

// -- Category Updates --

category.post('/update/*', async (req, res, next) => {
    if (!req.body.categoryId) {
        console.log("Error: No categoryId provided");
        res.json({message: "Error: No category specified"});
    } else {
        next();
    }
});

// -- Rename --
// token
// categoryId
// name
category.post('/update/rename', async (req, res) => {
    if (!req.body.name) {
        console.log("Error: No name provided");
        res.json({message: "Error: No name provided"});
    } else {
        try {
            const renameCategory = await Category.findByIdAndUpdate(req.body.categoryId, { name: req.body.name });
            res.json(renameCategory);
        } catch (err) {
            console.log(err);
            res.json({message: err});
        }
    }
});

// -- Change Budget
// token
// categoryId
// budget
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
            const changeCategoryBudget = await Category.findByIdAndUpdate(req.body.categoryId, { budget: amount });
            res.json(changeCategoryBudget);
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