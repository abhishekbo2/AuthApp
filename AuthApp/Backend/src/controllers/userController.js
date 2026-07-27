const userModel = require('../models/userModel.js')

exports.getMe = async(req, res, next) => {
    try{
        const user = await userModel.findUserById(req.user.id);
        if(!user){
            return res.status(404).json({message: 'User not found'});
        };
        return res.status(200).json(user);
    }catch(err){
        console.error('GetMe error', err);
        return res.status(500).json({message:'Server Error'})
    };
};