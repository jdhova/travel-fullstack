const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const cors = require('cors');

require('dotenv').config();

// routes

const authenticateRoutes = require('./routes/authenticate');
const userRoutes = require('./routes/user');
const eventRoutes = require('./routes/event');
const tripRoutes = require('./routes/trip');

const app = express();

//  connection to db
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })

  .then(() => console.log('DB Connected'));

mongoose.connection.on('error', (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Middleware Routes
app.use('/api', authenticateRoutes);
app.use('/api', userRoutes);
app.use('/api', eventRoutes);
app.use('/api', tripRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app listning on ${port}`);
});
