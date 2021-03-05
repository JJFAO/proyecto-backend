const Meme = require('../models/Meme');


exports.crearMeme = async (req, res) => {
    console.log(req.body);

    const meme = new Meme({
        ...req.body,
        createdAt: Date.now(),
        creador: req.usuario.id,
    });
    await meme.save();

    res.send(meme);



};
exports.obtenerMemes = async () => {
    console.log('obtenermemes');
};
