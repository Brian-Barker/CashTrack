import express from 'express';
import Event from '../models/events.js';
import User from '../models/users.js';
import verifyToken from './auth.js';

const event = express.Router();

// --- Return List of Current events ---

event.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.json({message: err});
  }
});

// --- Create New event ---

event.post('/create', async (req, res) => {
  console.log(req.body);
  const event = new Event({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    password: req.body.password,
  });
  try {
    const saveEvent = await event.save();
    res.json(saveEvent);
  } catch (err) {
    res.json({message: err});
  }
});

// --- Get event By Id ---

event.get('/:eventId', async (req, res) => {});

// --- Delete event By Id ---

event.delete('/:eventId', async (req, res) => {});

// --- Update event ---

event.patch('/:eventId', async (req, res) => {});

// --- Attend event ---

event.post('/attend', async (req, res) => {
  let userId = verifyToken(req.body.token);
  if (!userId) {
    res.json({message: 'Invalid user'});
    return;
  }
  let event;
  try {
    event = await Event.findById(req.body.eventID);
  } catch (err) {
    res.json({message: 'Invalid eventID'});
    return;
  }
  let user;
  try {
    user = await User.findById(userId._id);
  } catch (err) {
    res.json({message: 'Something is clearly broken'});
    return;
  }

  if (req.body.password !== event.password) {
    res.json({message: 'Incorrect password!'});
    return;
  }

  event.attendeesNames.push(user.firstname + user.lastname);
  event.attendees.push(user._id);
  user.attendedEvents.push(event._id);

  const eventAttendee = await Event.updateOne(
    {_id: event._id},
    {
      $set: {
        attendees: event.attendees,
        attendeesNames: event.attendeesNames,
      },
    },
  );

  const updateUser = await User.updateOne(
    {_id: user._id},
    {
      $set: {
        attendedEvents: user.attendedEvents,
        points: user.points + 1,
      },
    },
  );

  res.json(updateUser);
});

export default event;
