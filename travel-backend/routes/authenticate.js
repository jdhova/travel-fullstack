const express = require('express');
const router = express.Router();

const { signin } = require('../controllers/authenticate');

router.get('/signup');
router.get('/signin', signin);
router.post('/signout');

module.exports = router;
