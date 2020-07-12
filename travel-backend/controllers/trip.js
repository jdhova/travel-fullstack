const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs'); // maybe need to npm i file-system
const Trip = require('../models/trip');
const { errorHandler } = require('../helpers/dbErrorHandler');

// why do we populate catrgory??

exports.tripById = (req, res, next, id) => {
  Trip.findById(id)
    .populate('event')
    .exec((err, trip) => {
      if (err || !trip) {
        return res.status(400).json({
          error: 'trip not found',
        });
      }
      req.trip = trip;
      next();
    });
};

exports.read = (req, res) => {
  req.trip.photo = undefined;
  return res.json(req.trip);
};

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
    const { name, description, price, event, quantity, shipping } = fields;

    if (!name || !description || !price || !event || !quantity || !shipping) {
      return res.status(400).json({
        error: 'All fields are required',
      });
    }

    let trip = new Trip(fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size',
        });
      }
      trip.photo.data = fs.readFileSync(files.photo.path);
      trip.photo.contentType = files.photo.type;
    }

    trip.save((err, result) => {
      if (err) {
        console.log('Trip CREATE ERROR ', err);
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

exports.remove = (req, res) => {
  let trip = req.trip;
  trip.remove((err, deletedTrip) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: 'Trip deleted successfully',
    });
  });
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
    let trip = req.trip;
    trip = _.extend(trip, fields);

    // 1kb = 1000
    // 1mb = 1000000

    if (files.photo) {
      // console.log("FILES PHOTO: ", files.photo);
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: 'Image should be less than 1mb in size',
        });
      }
      trip.photo.data = fs.readFileSync(files.photo.path);
      trip.photo.contentType = files.photo.type;
    }

    trip.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(result);
    });
  });
};

// /**
//  * sell / arrival
//  * by sell = /trips?sortBy=sold&order=desc&limit=4
//  * by arrival = /trips?sortBy=createdAt&order=desc&limit=4
//  * if no params are sent, then all trips are returned
//  */

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : 'asc';
  let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Trip.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, trips) => {
      if (err) {
        return res.status(400).json({
          error: 'Trips not found',
        });
      }
      res.json(trips);
    });
};

/**
 * it will find the products based on the req product category
 * other products that has the same category, will be returned
 */

exports.listRelated = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Trip.find({ _id: { $ne: req.trip }, category: req.trip.category })
    .limit(limit)
    .populate('event', '_id name')
    .exec((err, trips) => {
      if (err) {
        return res.status(400).json({
          error: 'trips not found',
        });
      }
      res.json(trips);
    });
};

exports.listEvents = (req, res) => {
  Product.distinct('event', {}, (err, events) => {
    if (err) {
      return res.status(400).json({
        error: 'Events not found',
      });
    }
    res.json(events);
  });
};

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */

exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : 'desc';
  let sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === 'price') {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Trip.find(findArgs)
    .select('-photo')
    .populate('event')
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: 'Trips not found',
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  // create query object to hold search value and event value
  const query = {};
  // assign search value to query.name
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
    // assigne event value to query.event
    if (req.query.event && req.query.event != 'All') {
      query.event = req.query.event;
    }
    // find the product based on query object with 2 properties
    // search and event
    Trip.find(query, (err, trips) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(trips);
    }).select('-photo');
  }
};

exports.decreaseQuantity = (req, res, next) => {
  let bulkOps = req.body.order.trips.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });
  /// recheck this code for errors
  Trip.bulkWrite(bulkOps, {}, (error, trips) => {
    if (error) {
      return res.status(400).json({
        error: 'Could not update trip',
      });
    }
    next();
  });
};
