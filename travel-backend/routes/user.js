const express = require('express');
const router = express.Router();

const {
  requireSignin,
  isAuth,
  isAdmin,
} = require('../controllers/authenticate');

// should include purchaseHistory below
const { userById, read, update } = require('../controllers/user');

router.get('/secret/:userId', requireSignin, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get('/user/:userId', requireSignin, isAuth, read);
router.put('/user/:userId', requireSignin, isAuth, update);
// should include purchaseHistory below
//router.get('/orders/by/user/:userId', requireSignin, isAuth);

// this helps in getting the exact user Id and used anytime
// we want to get a certain userID.

router.param('userId', userById);

module.exports = router;
