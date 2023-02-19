const express = require('express');
const router = express.Router();
const sauces = require('../controllers/sauce');
const checkToken = require('../middleware/auth')

router.get('/', checkToken, sauces.getSauces);

module.exports = router;