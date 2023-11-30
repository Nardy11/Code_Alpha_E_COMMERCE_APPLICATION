const Order =require("../models/Order");


module.exports ={
    getUserOrder:async (req, res)=>{
        const customerId = req.params.id
        try{
            const order =await Order.find({customerId})
            .populate({path:"productId",select:"-description -product_location"}).exec();
            res.status(200).json(order);

        }catch(err){
            res.status(500).json({message:err.message});
        }
    },
    addToOrders: async (req, res) => {
        try {
          const { customerId, productId, quantity, total, payment_status } = req.body;
          console.log("Received order details:");
          console.log("customerId:", customerId);
          console.log("productId:", productId);
          console.log("quantity:", quantity);
          console.log("total:", total);
          console.log("payment_status:", payment_status);
      
          const newOrder = new Order({
            customerId,
            productId,
            quantity,
            total,
            payment_status,
          });
      
          const savedOrder = await newOrder.save();
      
          console.log("Order saved successfully:", savedOrder);
      
          res.status(201).json({ message: 'Order added successfully', order: savedOrder });
        } catch (err) {
          console.error("Error adding order:", err);
          res.status(500).json({ message: err.message });
        }
      },
      
    
      removeFromOrders: async (req, res) => {
        try {
          const customerId = req.params.customerId;
          const orderId = req.params.orderId;
          console.log(customerId, orderId);
          const removedOrder = await Order.findOneAndDelete({ _id: orderId, customerId });
      
          if (!removedOrder) {
            return res.status(404).json({ message: 'Order not found' });
          }
      
          res.status(200).json({ message: 'Order removed successfully', order: removedOrder });
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      },
      

}