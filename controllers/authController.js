const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuarioEncontrado = await Usuario.findOne({ email });
        if (!usuarioEncontrado) {
            return res.status(400).json({ msg: 'Datos no validos.' });
        }

        const passCorrecta = await bcryptjs.compare(password, usuarioEncontrado.password);
        if (!passCorrecta) {
            return res.status(400).json({ msg: 'Datos no validos.' });
        }

        // Crear y firmar jwt
        const payload = {
            usuario: {
                id: usuarioEncontrado.id,
            },
        };
        jwt.sign(payload, process.env.SECRETA, { expiresIn: 360000 }, (error, token) => {
            if (error) {
                throw error;
            }
            res.send(token);
        });
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error al autenticar.');
    }
};
