import express from 'express';
import User from '../models/users.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config.js';
import verifyToken from './auth.js';
import category from './categories.js';

const user = express.Router();

// --- Return List of Current Users ---

user.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({message: err});
  }
});

// --- Create New User ---

user.post('/create', async (req, res) => {
  const existingUser = await User.findOne({username: req.body.username});
  const existingEmail = await User.findOne({email: req.body.email});
  if (existingUser !== null) {
    res.json({message: 'Username already exists.'});
    return;
  }

  if (existingEmail !== null) {
    res.json({message: 'Email address already exists.'});
    return;
  }

  let salt;
  let hash;

  try {
    salt = await bcrypt.genSalt(12);
    hash = await bcrypt.hash(req.body.password, salt);
  } catch (err) {
    res.json({message: 'Password hashing failed.'});
    return;
  }

  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    password: hash,
  });
  try {
    const saveUser = await newUser.save((err,user) => {
        if (err) {
            console.log(err)
            res.json({message: err});
        }
        else {
            category.createPresets(user);
            res.json(saveUser);
        }
    });

  } catch (err) {
    res.json({message: err});
  }
});

// --- Get User By Id ---

user.get('/:userId', async (req, res) => {
  try {
    const users = await User.findById(req.params.userId);
    res.json(users);
  } catch (err) {
    res.json({message: err});
  }
});

// --- Delete User By Id ---

user.delete('/:userId', async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({_id: req.params.userId});
    res.json(deleteUser);
  } catch (err) {
    res.json({message: err});
  }
});

// --- Update User ---

user.patch('/:userId', async (req, res) => {
  try {
    const updateUser = await User.updateOne(
      {_id: req.params.userId},
      {$set: {firstname: req.body.name}},
    );
    res.json(updateUser);
  } catch (err) {
    res.json({message: err});
  }
});

// --- Login to Existing User ---

user.post('/login', async (req, res) => {
  try {
    const loginUser = await User.findOne({username: req.body.username});
    if (loginUser !== null) {
      const passValid = await bcrypt.compare(
        req.body.password,
        loginUser.password,
      );
      if (!passValid) {
        res.json({message: 'Invalid username or password!'});
        return;
      }
      const token = jwt.sign({_id: loginUser._id}, process.env.NOT_A_SECRET);
      res.json({token: token});
      return;
    }
    res.json({message: 'Invalid username or password!'});
  } catch (err) {
    res.json({message: err});
  }
});

// --- Get Existing User Data ---

user.post('/getUser', async (req, res) => {
  try {
    let token = verifyToken(req.body.token);
    if (token === false) {
      res.json({message: 'Invalid token recieved!'});
      return;
    }
    const getUser = await User.findById(token._id);
    res.json({getUser});
  } catch (err) {
    res.json({message: 'Error: Something is incorrecto!'});
  }
});

export default user;
