const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, default: ""},
    description: {type: String, default: ""},
    mainPepper: {type: String, default: ""},
    imageUrl: {type: String, default: ""},
    heat: {type: Number, min: 1, max: 10},
    likes: {type: Number, default: 0},
    dislikes: {type: Number, default: 0},
    usersLiked: {type: [String], default: []},
    usersDisliked: {type: [String], default: []},
});

module.exports = mongoose.model('Sauce', sauceSchema);