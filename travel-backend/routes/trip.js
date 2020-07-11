const express = require('express');
const router = express.Router();

const {
  create,
  tripById,
  read,
  remove,
  update,
  list,
  listRelated,
  listEvents,
  listBySearch,
  photo,
  listSearch,
} = require('../controllers/trip');
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require('../controllers/authenticate');
const { userById } = require('../controllers/user');

router.get('/trip/:tripId', read);
router.post('/trip/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/trip/:tripId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/trip/:tripId/:userId', requireSignin, isAuth, isAdmin, update);

router.get('/trips', list);
router.get('/trips/search', listSearch);
router.get('/trips/related/:tripId', listRelated);
router.get('/trips/events', listEvents);
router.post('/trips/by/search', listBySearch);
router.get('/trip/photo/:tripId', photo);

router.param('userId', userById);
router.param('tripId', tripById);

module.exports = router;
