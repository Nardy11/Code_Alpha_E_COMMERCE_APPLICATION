const Product =require('../models/Products');

module.exports = {
    createProduct:async (req,res)=>{
        const newProduct = new Product(req.body);
        try{
            await newProduct.save();
            res.status(200).json("product created successfully");
        }catch(err){
            res.status(500).json("failed to create product");

        }
    },
    getAllProducts:async (req,res)=>{
        try{
            const products = await Product.find().sort({createdAt:-1});
            res.status(200).json(products);
        }catch(err){
            res.status(500).json("failed to get products");
        }
    },
    getProduct:async (req,res)=>{
        try{
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        }catch(err){
            res.status(500).json("failed to get product");
        }
    },
    searchProduct:async (req,res)=>{
        try{
            const result = await Product.aggregate(
                [
                    {
                      $search: {
                        index: "default",
                        text: {
                          query: req.params.key,
                          path: {
                            wildcard: "*"
                          }
                        }
                      }
                    }
                  ]
            )
            if(result.length==0){
                res.status(404).json("No product found");
            }else{

                res.status(200).json(result);
            }
        } catch (err) {
            res.status(500).json('Failed to find products' );
        }
        
    }
}