const User =require("../models/User");


module.exports ={
    deleteUser:async (req, res)=>{
        try{
          await User.findByIdAndDelete(req.params.id);
          res.status(200).json({message:"User Deleted Successfully"});
        }catch(err){
            res.status(500).json({message:err.message});
        }
    },
    getUser:async (req, res)=>{
        try{
          const user = await User.findById(req.params.id);
          if(!user){
            return res.status(401).json({message:"User Not Found"});
          }
          res.status(200).json(user);
        }catch(err){
            res.status(500).json({message:err.message});
        }
    },

}