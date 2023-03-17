const express = require('express');
const router = express.Router();
const sauces = require('../controllers/sauce');
const checkToken = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', checkToken, sauces.getSauces);

router.post('/', checkToken, upload, sauces.createSauce);

router.get('/:id', checkToken, sauces.getOneSauce);

router.delete('/:id', checkToken, sauces.deleteOneSauce);

router.put('/:id', checkToken, upload, sauces.updateOneSauce);

module.exports = router;