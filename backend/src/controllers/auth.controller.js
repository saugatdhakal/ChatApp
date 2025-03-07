import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js'; // Import the User model
import bcrypt from 'bcryptjs'; // Import bcrypt
export const signup = async (req, res) => {
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
    const {email,password} = req.body;
    try{
        if(!email && !password){
          return  res.status(400).json({message:'Fill the field completely'});
        }
        const user= await User.findOne({email});
        if(!user){
          return  res.status(400).json({message:"Invalid Credentials"});
        }
        const isPasswordCorrect= await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid Credentials"})
        }

        generateToken(user._id,res);

        res.status(200).json({
            id:user._id,
            Name: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const logout = async (req, res) => {
    try{
        res.cookie("jwt","",{
            maxAge:0
        });
        res.status(200).json({message:"logged out successfully"});
    }
    catch (err){
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const checkAuth = async (req,res)=>{
    try{
        res.status(200).json(req.user);
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"});
    }
}