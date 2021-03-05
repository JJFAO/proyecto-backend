const Meme = require('../models/Meme');

exports.crearMeme = async (req, res) => {
    const meme = new Meme({
        ...req.body,
        createdAt: Date.now(),
        creador: req.usuario.id,
    });
    await meme.save();

    res.send(meme);
};

exports.obtenerMemes = async (req, res) => {
    const memes = await Meme.find().select('-__v');
    res.send(memes);
};
