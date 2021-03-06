const express = require('express');
const router = express.Router();

const { signup, signin } = require('../controllers/authenticate');
const { userSignupValidator } = require('../validator');

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.post('/signout');

module.exports = router;
