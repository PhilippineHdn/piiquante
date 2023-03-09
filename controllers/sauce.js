const Sauces = require('../models/sauce');

const getSauces = async (req, res) => {
    try {
        console.log(req.user);
        const sauces = await Sauces.find();
        res.status(200).send(sauces);
    } catch (error) {
        res.status(401).json({ message: error.message});
    }
};

const createSauce = async (req, res) => {
    try {
        if (!req.body.sauce) {
            throw Error('Sauce object is missing');
        } 
        const sauce = JSON.parse(req.body.sauce); 
        if (!sauce.name || !sauce.userId) {
            throw Error('Sauce object not completed');
        }
        console.log(req.user._id);
        console.log(sauce.userId)
        if (String(req.user._id) !== sauce.userId) {
            throw Error('You\'re not allowed');
        }
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
        res.status(401).json({ message: error.message});
    }
};

exports.getSauces = getSauces; 
exports.createSauce = createSauce;