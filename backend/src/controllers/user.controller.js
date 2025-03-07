import User from '../models/user.model.js'; // Import the User model
import cloudinary from '../lib/cloudinary.js';
export const updateProfile = async(req,res)=>{
    try{

        const {profilePic} = req.body;
        const user=req.user._id; // user from middleware

        if(!profilePic){
            return res.status(400).json({message:"Profile pic is required"});
        }

       const uploadRes= await cloudinary.uploader.upload(profilePic);
       // if upload success URL will be provided
       const updateUser = await User.findByIdAndUpdate(user._id,
        {profilePic:uploadRes.secure_url},
        {new:true}); 

        res.status(200).json(updateUser);
    }
    catch(err){
        res.status(500).json({message:"Internal Server Error"});
        
    }
}