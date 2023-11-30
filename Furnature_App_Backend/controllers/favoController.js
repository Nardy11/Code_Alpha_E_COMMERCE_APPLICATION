const Favorite =require("../models/Favorite");
const Product = require("../models/Products");

module.exports ={
    getUserFavorite: async (req, res) => {
        const userId = req.params.id;
        console.log('Fetching favorites for user ID:', userId);
      
        try {
          const favorites = await Favorite.find({ userId :`user${userId}` }).populate('productId');
          console.log('Favorites:', favorites);
      
          res.status(200).json(favorites);
        } catch (err) {
          console.error('Error fetching favorites:', err);
          res.status(500).json({ message: err.message });
        }
      }      
      ,
    addFavorite:async (req, res)=>{
        const userId = req.params.id
        const productId = req.params.productId
        try{
            const favorite =await Favorite.findOne({userId,productId})
            if(favorite){
                res.status(200).json({message:"Already Favorite"})
            }else{
                const newFavorite =new Favorite({userId,productId})
                await newFavorite.save();
                res.status(200).json({message:"Added"})
            }
        }catch(err){
            res.status(500).json({message:err.message});
        }
    },
    deleteFavorite:async (req, res)=>{
        const userId = req.params.id
        const productId = req.params.productId
        try{
            const favorite =await Favorite.findOneAndDelete({userId,productId})
            res.status(200).json({message:"Deleted"})
        }catch(err){
            res.status(500).json({message:err.message});
        }
    },
    existInFavorite:async(req, res)=>{
        const userId = req.params.id
        const productId = req.params.productId
        try{
            const favorite =await Favorite.findOne({userId :`user${userId}`,productId})
            
            if(favorite){
                res.status(200).json({ exists: true,message:"Already Favorite"})
            }else{
                res.status(200).json({ exists: false,message:"Not Favorite"})
            }
        }catch(err){
            res.status(500).json({message:err.message});
        }
    }

}