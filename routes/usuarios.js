// Rutas para crear usuarios
const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');
const auth = require('../middlewares/auth');

// Crear un usuario
// api/usuarios
router.post(
    '/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'Agrega un Email Valido').isEmail(),
        check('password', 'El password debe tener mínimo de 6 caracteres').isLength({ min: 6 }),
    ],
    usuarioController.crearUsuario
);
router.get('/usuarioLogueado', auth, usuarioController.usuarioLogueado);
router.get('/', auth, usuarioController.obtenerUsuarios);
router.put('/', usuarioController.actualizarUsuario);
router.delete('/', usuarioController.eliminarUsuario);

module.exports = router;
