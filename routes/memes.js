const express = require('express');
const router = express.Router();
const memesController = require('../controllers/memesController');
const auth = require('../middlewares/auth');

router.post('/', auth, memesController.crearMeme);
router.delete('/:memeId', auth, memesController.eliminarMeme);
router.get('/:memeId', memesController.obtenerMeme);
router.get('/', memesController.obtenerMemes);

module.exports = router;
