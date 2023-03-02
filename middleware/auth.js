const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
 
module.exports = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')?.[1];
    if (!token?.length) {
        return res.status(401).json({message:"Missing headers authorization"});
    }
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken?.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
        return res.status(401).json({ message: 'Utilisateur introuvable' })
    }
    req.user = user;

    next();
};