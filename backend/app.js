import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config.js';
import userRoutes from './routes/users.js';
import eventRoutes from './routes/events.js';
import categoryRoutes from './routes/categories.js';
import * as path from 'path';
import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

app.use('*', async (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://swe-at.herokuapp.com/');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, Accept, Content-Type, Authorization',
  );
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// --- Middlewares ---

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/users', userRoutes);
app.use('/events', eventRoutes);
app.use('/categories', categoryRoutes);

// --- Routes ---

// app.get('/*', function (req, res) {
//    res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.get('/', (req, res) => {
  res.json({message: 'API Home'});
});

// --- Connect to MongoDB ---

mongoose.connect(
  process.env.DB_CONNECTION,
  {useNewUrlParser: true, useUnifiedTopology: true},
  () => {
    console.log(
      'Database connection status: ',
      mongoose.connection.readyState ? 'Connected!' : 'Something went wrong...',
    );
  },
);

// --- Listen On Port 3001 ---

app.listen(process.env.PORT || 3000);
