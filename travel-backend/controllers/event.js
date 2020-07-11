const Event = require('../models/event');
const Trip = require('../models/trip');
// check line 60
const { errorHandler } = require('../helpers/dbErrorHandler');

//   this picks the exact eventId thats required with params.
exports.eventById = (req, res, next, id) => {
  Event.findById(id).exec((err, event) => {
    if (err || !event) {
      return res.status(400).json({
        error: 'event does not exist',
      });
    }
    req.event = event;
    next();
  });
};

// saves the new event to db.
// need to check validation for errors from model ??

exports.create = (req, res) => {
  const event = new Event(req.body);
  event.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({ data });
  });
};

exports.read = (req, res) => {
  return res.json(req.event);
};

// updates the event with new info with the PUT route using the
// event model.

exports.update = (req, res) => {
  //   console.log('req.body', req.body);
  //   console.log('event update param', req.params.eventId);
  const event = req.event;
  event.name = req.body.name;
  event.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

// removed event but first checks if events still have trips
// and if it does you can delete.
// need to check the Trips and see relationship
exports.remove = (req, res) => {
  const event = req.event;
  Trip.find({ event }).exec((err, data) => {
    if (data.length >= 1) {
      return res.status(400).json({
        message: `Sorry. You cant delete ${event.name}. It has ${data.length} associated products.`,
      });
    } else {
      event.remove((err, data) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        }
        res.json({
          message: 'event deleted',
        });
      });
    }
  });
};

exports.list = (req, res) => {
  Event.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};
