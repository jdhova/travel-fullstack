const express = require('express');
const router = express.Router();

const {
  create,
  eventById,
  read,
  update,
  remove,
  list,
} = require('../controllers/event');
const {
  requireSignin,
  isAuth,
  isAdmin,
} = require('../controllers/authenticate');
const { userById } = require('../controllers/user');

router.get('/event/:eventId', read);
router.post('/event/create/:userId', requireSignin, isAuth, isAdmin, create);
// router.put('/event/:eventUpdateId/:userId', requireSignin, isAuth, isAdmin, update);
router.put('/event/:eventId/:userId', requireSignin, isAuth, isAdmin, update);

router.delete(
  '/event/:eventId/:userId',
  requireSignin,
  isAuth,
  isAdmin,
  remove
);
router.get('/events', list);

router.param('eventId', eventById);
router.param('userId', userById);

module.exports = router;
