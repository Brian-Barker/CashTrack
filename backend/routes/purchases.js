import express from 'express';
import Purchase from '../models/purchases.js';
import Category from '../models/category.js';
import User from '../models/users.js';
import verifyToken from './auth.js';

const purchase = express.Router();

// --- Verify Token and that any provided category matches the token ---

purchase.use('/', async (req, res, next) => {
    try {
        let token = verifyToken(req.body.token);
        if (token === false) {
            res.json({message: 'Invalid user token received.'});
        } else { // Verify that any specified category matches user
            const user = await User.findById(token._id, (err, usr) => {
                if (!usr) {
                    throw "Error while parsing user token: No user found.";
                }
            });

            const category = await Category.findById(req.body.categoryId ? req.body.categoryId : user.categoryHead);
            if (!category) {
                throw "Error: invalid categoryId."
            }

            if (req.body.purchaseId) {
                const purchase = await Purchase.findById(req.body.purchaseId);
                if (!purchase)
                    throw 'Error: purchase not found.';

                if (purchase.user != token._id)
                    throw 'Error: purchase is not owned by user.';

                res.locals.purchase = purchase;
            }

            if (category.user != token._id) {
                throw 'Error: category is not owned by user.'
            } else {
                res.locals.user = user;
                res.locals.category = category;
                res.locals.token = token;
                next();
            }
        }
    } catch (err) {
        console.error(err);
        res.json({error: err});
    }
});

// --- Create Purchase ---
// token
// categoryId (defaults to user head if none specified)
// store
// info
// timestamp (defaults to current time if none specified)
// amount -- Required
purchase.post('/create', async (req, res) => {
    try {
        if (!req.body.amount) throw 'Error: no amount specified';

        const newPurchase = new Purchase({
            store: req.body.store ? req.body.store : null,
            info: req.body.info ? req.body.info : null,
            category: res.locals.category._id,
            timestamp: req.body.timestamp ? req.body.timestamp : Date.now(),
            user: res.locals.user,
            amount: req.body.amount,
        });

        const savePurchase = await newPurchase.save();

        const updateCategory = await Category.updateOne({_id: res.locals.category._id}, {
            $push: { purchases: savePurchase }
        });

        res.json(savePurchase);
    } catch (err) {
        console.error(err)
        res.json({message: err});
    }

});

// --- Delete Purchase ---
// token
// purchaseId
purchase.delete('/', async (req, res) => {
    try {
        const updateCategory = await Category.updateOne({_id: res.locals.purchase.category}, {
            $pull: { purchases: req.body.purchaseId }
        });

        const deletePurchase = await Purchase.deleteOne({_id: req.body.purchaseId}, (err) => {
            if (err) {
                throw err;
            }
        });

        res.json({message: 'Success'});
    } catch (err) {
        console.error(err)
        res.json({error: err});
    }

});

// --- Edit Purchase ---
// token
// purchaseId
// store
// info
// amount
// timestamp
purchase.post('/update', async (req, res) => {
    try {
        const updatePurchase = await Purchase.findByIdAndUpdate(req.body.purchaseId, {
            store: req.body.store ? req.body.store : res.locals.purchase.store,
            info: req.body.info ? req.body.info : res.locals.purchase.info,
            amount: req.body.amount ? req.body.amount : res.locals.purchase.amount,
            timestamp: req.body.timestamp ? req.body.timestamp : res.locals.purchase.timestamp,
        }, (err) => { if (err) throw err; });

        res.json({message: 'Success'});
    } catch (err) {
        console.error(err)
        res.json({error: err});
    }
});

// --- Move Purchase ---
// token
// purchaseId
// categoryId <- The category the purchase should be moved to
purchase.post('/move', async (req, res) => {
    try {
        if (req.body.categoryId == res.locals.purchase.category) {
            throw 'Error: attempt to move purchase to its current category. Must specify a category the purchase isn\'t already in.'
        }
        const updateNewCategory = await Category.findByIdAndUpdate(req.body.categoryId, {
            $push: { purchases: req.body.purchaseId }
        }, (err) => { if (err) throw err });

        const updatePurchase = await Purchase.findByIdAndUpdate(req.body.purchaseId, {
            category: req.body.categoryId
        }, (err) => { if (err) throw err });

        const updateOldCategory = await Category.findByIdAndUpdate(res.locals.purchase.category, {
            $pull: { purchases: req.body.purchaseId }
        }, (err) => { if (err) throw err });

        res.json({message: 'Success'});
    } catch (err) {
        console.error(err)
        res.json({error: err});
    }
});

export default purchase;