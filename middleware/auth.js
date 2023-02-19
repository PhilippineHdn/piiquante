const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
 
module.exports = async (req, res, next) => {
   try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const user = await UserModel.findById(userId);
        if (!user) {
            throw Error('Utilisateur introuvable')
        }
        req.user = user;
    
        next();
   } catch(error) {
       res.status(401).json({ message: error.message });
   }
};