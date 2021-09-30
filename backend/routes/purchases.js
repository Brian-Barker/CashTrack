import express from 'express';
import Category from '../models/category.js';
import User from '../models/users.js';
import verifyToken from './auth.js';

const purchase = express.Router();

// --- Create Purchase ---

purchase.post('/create', async (req, res) => {
    if (!req.body.categoryId) {
        console.log("Error: No categoryId provided");
        res.json({message: "Error: No category specified"});
    } else {

    }
});

// --- Delete Purchase ---

// --- Edit Purchase ---

// --- Move Purchase ---

export default purchase;