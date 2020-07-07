const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
require('dotenv').config;

// routes

const authenticateRoutes = require('./routes/authenticate');

// app.get('/', (req, res) => {
//   res.send({ msg: 'hello from react' });
// });

// middlewares

app.use('/api', authenticateRoutes);

//  connection to db

mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true })

  .then(() => console.log('DB Connected'));

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app listning on ${port}`);
});
