const Sauces = require('../models/sauce');

const getSauces = async (req, res) => {
    try {
        console.log(req.user);
        const sauces = await Sauces.find();
        res.status(200).send(sauces);
    } catch (error) {
        res.status(401).json({ message: error.message});
    }
}

exports.getSauces = getSauces; 