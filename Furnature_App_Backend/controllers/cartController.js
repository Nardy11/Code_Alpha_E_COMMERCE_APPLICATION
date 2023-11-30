const Products = require("../models/Products");
const Cart = require("../models/Cart");


module.exports = {
    addToCart: async (req, res) => {
        const { userId, cartItem, quantity } = req.body;
        console.log(userId);
        console.log(cartItem);
        console.log(quantity);
        try {
            const cart = await Cart.findOne({ userId: userId });
            if (cart) {
                const existingProduct = cart.products.find(product => product.cartItem.toString() === cartItem);
                if (existingProduct) {
                    existingProduct.quantity += 1;
                } else {
                    cart.products.push({ cartItem, quantity });
                }
                await cart.save();
                res.status(200).json("product added successfully");
            } else {
                const newCart = new Cart({ userId, products: [{ cartItem, quantity }] });
                await newCart.save();
                res.status(200).json("cart added successfully");
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getCart: async (req, res) => {
        const userId = req.params.id;

        try {
            const cart = await Cart.find({ userId }).populate('products.cartItem', "_id title supplier price imageUrl");
            res.status(200).json(cart);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    deleteCartItem: async (req, res) => {
        const userId = req.params.userId; // Assuming userId is sent in the request body
        const cartItemId = req.params.cartItemId;
        console.log(cartItemId);
        console.log(userId);
        try {
            const updatedCart = await Cart.findOneAndUpdate(
                { userId, 'products.cartItem': cartItemId },
                { $pull: { 'products': { cartItem: cartItemId } } },
                { new: true }
            );
    
            if (!updatedCart) {
                return res.status(404).json({ message: "Cart Item not found" });
            }
    
            res.status(200).json(updatedCart);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    
    
        
,    
    decrementCartItem: async (req, res) => {
        const { userId, cartItem } = req.body;
        console.log(cartItem);
        console.log(userId);
        try {
            const cart = await Cart.findOne({ userId })
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }
    
            const existingProduct = cart.products.find(product => product.cartItem.toString() === cartItem);
            if (!existingProduct) {
                return res.status(404).json({ message: "Product not found" });
            }
    
            if (existingProduct.quantity === 1) {
                cart.products = cart.products.filter(product => product.cartItem.toString() !== cartItem);
            } else {
                existingProduct.quantity -= 1;
            }
    
            await cart.save();
    
            if (existingProduct.quantity === 0) {
                await Cart.updateOne(
                    { userId },
                    { $pull: { products: { cartItem } } }
                );
            }
    
            res.status(200).json({ message: "Product removed successfully" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },    
    incrementCartItem: async (req, res) => {
        const { userId, cartItem } = req.body;
        console.log(cartItem);
        console.log(userId);
        try {
          const cart = await Cart.findOne({ userId });
          if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
          }
      
          const existingProduct = cart.products.find(
            (product) => product.cartItem.toString() === cartItem
          );
      
          if (!existingProduct) {
            return res.status(404).json("Product not found");
          }
      
          existingProduct.quantity += 1;
      
          await cart.save();
      
          res.status(200).json("Product quantity incremented successfully");
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      }
      

}