const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send({ msg: 'hello from react' });
});

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
