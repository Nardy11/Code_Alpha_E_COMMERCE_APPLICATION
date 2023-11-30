const mongoose  = require('mongoose');
const OrderSchema =new mongoose.Schema({
    customerId:{type : 'string',required: true},
    productId:{type : mongoose.Schema.Types.ObjectId,ref: "Products"},
    quantity:{type :Number,required: true},
    total:{type :Number,required: true},
    delivery_status:{type :"String",default:"pending"},
    payment_status:{type:"String",required:true}
},{timestamps:true});

module.exports =mongoose.model("Order",OrderSchema)