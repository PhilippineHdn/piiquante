const express = require('express');
const router = express.Router();
const sauces = require('../controllers/sauce');
const checkToken = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', checkToken, sauces.getSauces);

router.post('/', upload, sauces.createSauce);

module.exports = router;