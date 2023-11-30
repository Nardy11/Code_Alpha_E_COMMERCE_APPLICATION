const User =require("../models/User");

const CryptoJS=require("crypto-js");
const jwt = require("jsonwebtoken");

module.exports ={
    createUser:async (req, res)=>{
        const user =new User({
            username:req.body.username,
            email:req.body.email,
            location:req.body.location,
            password:CryptoJS.AES.encrypt(req.body.password,process.env.SECRET).toString(),
        });
        try{
            await user.save();
            res.status(201).json({message:"User Created Successfully"});
        }catch(err){
            res.status(500).json({message:err.message});
        }
    },
    loginUser:async (req, res)=>{
        
        try{
            const user = await User.findOne({email:req.body.email});
            if(!user){
                return res.status(404).json({message:"User not found"});
            }else{
                const isMatch =CryptoJS.AES.decrypt(user.password,process.env.SECRET).toString(CryptoJS.enc.Utf8);
                if(isMatch === req.body.password){
                    const token =jwt.sign({_id:user._id},process.env.SECRET,{expiresIn:"7d"});
                    const{password,_v,createdAt,updatedAt,...userData}=user._doc;
                    res.status(200).json({...userData,token:token});
                }else{
                    res.status(401).json({message:"Invalid Credentials"});
                }
            }
        }catch(err){
            res.status(500).json({message:err.message});
        }
    }

}