const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const Entry = require('./models/Entry');

dotenv.config();
const app = express();
app.use(express.static('public'));
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.get('/entries', async (req, res) => {
  const entries = await Entry.find().sort({ _id: -1 });
  res.json(entries);
});

app.post('/add', async (req, res) => {
  const { date, temperature, mood, location, humidity, wind, condition } = req.body;
  const newEntry = new Entry({ date, temperature, mood, location, humidity, wind, condition });
  await newEntry.save();
  res.send({ message: 'Entry added successfully!' });
});


app.listen(process.env.PORT, () => {
  console.log(`🌍 Server running on http://localhost:${process.env.PORT}`);
});