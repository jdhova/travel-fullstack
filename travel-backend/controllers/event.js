const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs'); // core node.js modeule no need for npm i
const Event = require('../models/event');

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
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }
    // check for all fields
    const { name, description } = fields;

    if (!name || !description) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    let event = new Event(fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size',
        });
      }
      event.photo.data = fs.readFileSync(files.photo.path);
      event.photo.contentType = files.photo.type;
    }

    event.save((err, result) => {
      if (err) {
        console.log('Event CREATE ERROR ', err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.photo = (req, res, next) => {
  if (req.event.photo.data) {
    res.set('Content-Type', req.event.photo.contentType);
    return res.send(req.event.photo.data);
  }
  next();
};

exports.read = (req, res) => {
  req.event.photo = undefined;
  return res.json(req.event);
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: 'Image could not be uploaded',
      });
    }

    // function of the lodash ??
    let event = req.event;
    event = _.extend(event, fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size',
        });
      }
      event.photo.data = fs.readFileSync(files.photo.path);
      event.photo.contentType = files.photo.type;
    }

    event.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

// removed event but first checks if Events still have events
// and if it does you can delete.
// need to check the Trips and see relationship
exports.remove = (req, res) => {
  const event = req.event;
  Event.find({ event }).exec((err, data) => {
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
          message: 'Event deleted',
        });
      });
    }
  });
};

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Event.find()
    .select('-photo')
    // .populate('if you want to relate to upper user Admin profile')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, events) => {
      if (err) {
        return res.status(400).json({
          error: 'Events not found',
        });
      }
      res.json(events);
    });
};
