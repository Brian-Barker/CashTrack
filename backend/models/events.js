import mongoose from 'mongoose';

const EventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  attendees: {
    type: Array,
    default: [],
  },
  attendeesNames: {
    type: Array,
    default: [],
  },
});

export default mongoose.model('Events', EventSchema);
