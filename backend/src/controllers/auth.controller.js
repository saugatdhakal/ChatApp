import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js'; // Import the User model
import bcrypt from 'bcryptjs'; // Import bcrypt
export const signup = async (req, res) => {
    console.log("login route")
    const {fullName,email,password} = req.body;
    try{
         if(!fullName && !email && !password){
            res.status(400).json({message:"All fields are required"});
         }
         const findUser = await User.findOne({email});
         if(findUser){
           return  res.status(400).json({message:"User already exists"});
         }
         const handlePassword = bcrypt.hashSync(password, 10);
         const newUser = new User({fullName,email,password:handlePassword});

         if(newUser){
            const token = generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName : newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
                token:token
            })

         }else{
            res.status(400).json({message:"User not created"});
         }

    }catch(err){
        console.log("Error in signup controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}
export const login = async (req, res) => {
    res.status(200).json({message:"login successful saugat"})
}

export const logout = async (req, res) => {

}