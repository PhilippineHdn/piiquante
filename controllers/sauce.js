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
        res.status(201).send({message: 'saved'});
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
            return res.status(404).json({ message: 'Cannot find sauce'});
        }
        return res.status(200).send(sauce);
    } catch (error) {
        return res.status(500).json({ message: error?.message});
    }
}

const deleteOneSauce = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || !ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Sauce ID is incorrect'});
        }
        const deletedSauce = await Sauces.deleteOne({ _id: id, userId: String(req.user?._id)});
        if (deletedSauce.deletedCount === 0) {
            return res.status(400).json({ message: 'Failed to delete sauce'});
        }
        return res.status(200).send({message: "Sauce deleted"});
    } catch (error) {
        return res.status(500).json({ message: error?.message});
    }
}

const updateOneSauce = async (req, res) => {
    try {
        const sauce = await Sauces.findById(req.params.id);
        const sauceCreator = sauce.userId;
        
        if (String(req.user._id) !== sauceCreator) {
            return res.status(403).json({ message: 'You\'re not allowed'});
        }

        const sauceObject = req.file
            ? {
                ...JSON.parse(req.body.sauce),
                imageUrl: `http://localhost:3000/${req.file.path}`,
            }
            : req.body;

        await Sauces.updateOne({ _id: req.params.id }, sauceObject)

        return res.status(200).json({ message: "Sauce updated" })
    } catch (error) {
        return res.status(500).json({ message: error?.message});
    }
}

const updateSauceLike = async (id, userId, likedKey, userLikedKey, inc = 1) => {
    await Sauces.updateOne(
        { _id: id },
        {
          $inc: { [likedKey]: inc },
          [inc === 1 ? "$push" : "$pull"]: { [userLikedKey]: userId },
        }
      )
}

const likeOrDislikeOneSauce = async (req, res) => {
    try {
        const sauce = await Sauces.findById(req.params.id);
        if(!sauce) {
            return res.status(404).json({ message: error?.message});
        }
        const isVoteRemove = req.body.like === 0;
        const condition = isVoteRemove
            ? sauce.usersLiked.find(userLikedId => userLikedId === req.body.userId)
            : req.body.like === 1
        const likedKey = condition ? "likes" : "dislikes";
        const userLikedKey = condition ? "usersLiked" : "usersDisliked";
        await updateSauceLike(req.params.id, req.body.userId, likedKey, userLikedKey, isVoteRemove? -1 : 1);
        return res.status(200).json({ message: `Vote ${isVoteRemove? "removed": "added"} to ${likedKey} count!` });
    } catch (error) {
        return res.status(500).json({ message: error?.message});
    }
}

exports.getSauces = getSauces; 
exports.createSauce = createSauce;
exports.getOneSauce = getOneSauce;
exports.deleteOneSauce = deleteOneSauce;
exports.updateOneSauce = updateOneSauce;
exports.likeOrDislikeOneSauce = likeOrDislikeOneSauce;