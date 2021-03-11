const { ObjectId } = require('mongoose').Types;
const Meme = require('../models/Meme');

exports.crearMeme = async (req, res) => {
    try {
        const meme = new Meme({
            ...req.body,
            createdAt: Date.now(),
            creador: req.usuario.id,
        });
        await meme.save();
        res.send(meme);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al crear meme');
    }
};

exports.obtenerMemes = async (req, res) => {
    const memes = await Meme.find().select('-__v').populate('creador', 'nombre -_id');
    res.send(memes);
};

exports.obtenerMeme = async (req, res) => {
    try {
        const { memeId } = req.params;
        if (!ObjectId.isValid(memeId)) {
            return res.status(400).send('Id no valido');
        }
        const meme = await Meme.findById(memeId);
        if (!meme) {
            return res.status(404).send('Meme no encontrado');
        }
        res.send(meme);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al buscar el meme');
    }
};

exports.eliminarMeme = async (req, res) => {
    try {
        const { memeId } = req.params;
        if (!ObjectId.isValid(memeId)) {
            return res.status(400).send('Id no valido');
        }

        const meme = await Meme.findById(memeId);

        if (!meme) {
            return res.status(404).send('Meme no encontrado');
        }

        if (meme.creador.equals(req.usuario.id)) {
            return res.status(403).send('No tiene permisos para borrar el meme');
        }

        await meme.remove();
        res.send('Meme eliminado');
    } catch (error) {
        console.log(error);
        res.status(500).send('Error al eliminar meme');
    }
};
