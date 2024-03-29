const bcrypt = require('bcrypt');
const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');

const signUp = async (req,res) => {
    if(!req.body.email || !req.body.password) {
        return res.status(401).json({message : "Email ou mot de passe non renseigné"})
    }
    if (typeof req.body.email !== "string" || typeof req.body.password !== "string") {
        return res.status(401).json({message : "Vérifiez les champs renseignés"})
    }
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = new UserModel({
            email: req.body.email,
            password: hash
        });
        await user.save()

        res.send({message :"Inscription confirmée"});
    } catch (error) {
        res.status(401).json({ message: error.message});
    }
}

const login = async (req, res) => {
    if(!req.body.email || !req.body.password) {
        return res.status(400).json({message : "Email ou mot de passe non renseigné"})
    }
    if (typeof req.body.email !== "string" || typeof req.body.password !== "string") {
        return res.status(400).json({message : "Vérifiez les champs renseignés"})
    }
    const user = await UserModel.findOne({
        email : req.body.email
    })
    if (!user) {
        return res.status(404).json({message: "Email introuvable"});
    }
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) {
        return res.status(401).json({message: "Paire login/mot de passe incorrecte"});
    }
    const token = jwt.sign({
        userId : user._id
    }, 'RANDOM_TOKEN_SECRET')

    return res.status(200).json({ userId: user._id, token });
}

exports.signUp = signUp;
exports.login = login;