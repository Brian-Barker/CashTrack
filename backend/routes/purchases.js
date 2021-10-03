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

            const category = await Category.findById(req.body.categoryId ? req.body.categoryId : user.categoryHead, (err, cat) => {
                if (!cat) throw 'Error: invalid categoryId';
            });

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
// API:
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

        const updateCategory = await Category.updateOne({_id: res.locals.category._id}, { $push: { purchases: savePurchase } });

        res.json(savePurchase);
    } catch (err) {
        console.error(err)
        res.json({message: err});
    }

});

// --- Delete Purchase ---

// --- Edit Purchase ---

// --- Move Purchase ---

export default purchase;