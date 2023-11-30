const mongoose  = require('mongoose');
const ProductSchema =new mongoose.Schema({
    title:{type:"string",required:true},
    supplier:{type:"string",required:true},
    price:{type:"string",required:true},
    imageUrl:{type:"string",required:true},
    description:{type:"string",required:true},
    product_location:{type:"string",required:true},
},{timestamps:true});

module.exports =mongoose.model("Products",ProductSchema)