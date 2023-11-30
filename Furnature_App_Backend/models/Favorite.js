const mongoose  = require('mongoose');
const FavoriteSchema =new mongoose.Schema({
    userId:{type : 'string',required: true},
    productId:{type : mongoose.Schema.Types.ObjectId,ref: "Products"},
},{timestamps:true});

module.exports =mongoose.model("Favorite",FavoriteSchema)
