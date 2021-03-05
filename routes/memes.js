const express = require('express');
const router = express.Router();
const memesController = require('../controllers/memesController');

router.post('/', memesController.crearMeme);
router.get('/', memesController.obtenerMemes);

module.exports = router;

