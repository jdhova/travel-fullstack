const express = require('express');
const router = express.Router();

const { signin } = require('../controllers/authenticate');

router.post('/signup');
router.post('/signin', signin);
router.post('/signout');

module.exports = router;
