const express = require('express');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const app = express();
require('dotenv').config;

// routes

const authenticateRoutes = require('./routes/authenticate');

// app.get('/', (req, res) => {
//   res.send({ msg: 'hello from react' });
// });

//  connection to db
mongoose
  .connect(process.env.DATABASE, { useNewUrlParser: true })

  .then(() => console.log('DB Connected'));

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// Middleware Routes
app.use('/api', authenticateRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app listning on ${port}`);
});
