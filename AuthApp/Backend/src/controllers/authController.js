const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel.js');
const forGen = require('../utils/jwt.js');

exports.registerUser = async(req, res, next) => {
    const {name, email, password} = req.body;

    try{
    if(!name || !email || !password){
        return res.status(400).json({message: 'please provide all required details'});
    };
    
    const existUser = await userModel.findByEmail(email);
    const userExists = Boolean(existUser);   
    if(userExists){
        return res.status(400).json({message: 'User already exist / mail Id is already exists'});
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.createUser(name, email, hashedPassword);

    res.status(201).json({
        message: 'User created succesfully', 
        user: {
            id: newUser.id, 
            name: newUser.name, 
            email: newUser.email, 
            created_at: newUser.created_at
        }
    });

    }catch(err){
        return res.status(500).json({message: 'Server error'});
    }
};


exports.loginUser = async(req, res, next) => {
    const {email, password} = req.body;

    try{
        if(!email || !password){
            return res.status(400).json({message: 'Please provide the required credentials'});
        };

        const user = await userModel.findByEmail(email);
        if(!user){
            return res.status(400).json({message: 'User not found / Invalid credentials'});
        };


        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid credentials'});
        };

        const token = await forGen.generateToken(user.id);

        res.status(200).json({
            message: 'Loged in succesfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token,
        });
    }catch(error){
        console.error(error);
    res.status(500).json({ message: 'Server Error' });
    }
};