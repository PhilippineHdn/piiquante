const Sauces = require('../models/sauce');
const ObjectId = require('mongoose').Types.ObjectId;

const getSauces = async (req, res) => {
    try {
        const sauces = await Sauces.find();
        res.status(200).send(sauces);
    } catch (error) {
        res.status(401).json({ message: error.message});
    }
};

const createSauce = async (req, res) => {
    try {
        if (!req.body.sauce) {
            return res.status(400).json({ message: 'Sauce object is missing'});
        } 
        const sauce = JSON.parse(req.body.sauce); 
        if (!sauce.name || !sauce.userId) {
            return res.status(400).json({ message: 'Sauce object not completed'});
        }
        if (String(req.user._id) !== sauce.userId) {
            return res.status(403).json({ message: 'You\'re not allowed'});
        }
        //possible utiliser https://jsfiddle.net/JulienDumortier/wx38uojr/7/
        const sauceToSave = new Sauces({
            userId: sauce.userId,
            name: sauce.name,
            manufacturer: sauce.manufacturer,
            description: sauce.description,
            mainPepper: sauce.mainPepper,
            imageUrl: `http://localhost:3000/${req.file.path}`,
            heat: sauce.heat,
            });
        await sauceToSave.save()
        res.status(200).send({message: 'saved'});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
};

const getOneSauce = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || !ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Sauce ID is incorrect'});
        }
        const sauce = await Sauces.findById(id);
        if (!sauce) {
            return res.status(400).json({ message: 'Cannot find sauce'});
        }
        res.status(200).send(sauce);
    } catch (error) {
        res.status(401).json({ message: error.message});
    }
}

const deleteOneSauce = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || !ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Sauce ID is incorrect'});
        }
        const deletedSauce = await Sauces.deleteOne({ _id: id, userId: String(req.user._id)});
        if(deletedSauce.deletedCount === 0) {
            return res.status(400).json({ message: 'Failed to delete sauce'});
        }
        res.status(200).send({message: "Sauce deleted"});
    } catch (error) {
        res.status(401).json({ message: error.message});
    }
}

exports.getSauces = getSauces; 
exports.createSauce = createSauce;
exports.getOneSauce = getOneSauce;
exports.deleteOneSauce = deleteOneSauce;