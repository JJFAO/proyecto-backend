const mongoose = require('mongoose');

const memeSchema = mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true,
    },
    imagen: {
        type: String,
        required: true,
        trim: true,
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        trim: true,
        ref: 'Usuario',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model('Meme', memeSchema);
