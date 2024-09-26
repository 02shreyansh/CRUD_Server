const express=require("express")
const mongoose=require("mongoose")
const bodyParser=require("body-parser")
mongoose.connect("mongodb://localhost:27017/Product").then(()=>{
    console.log("connected to database")
}).catch((err)=>{
    console.log(err)
})
const ProductSchema=new mongoose.Schema({
    name:String,
    description:String,
    price:Number
})
const  Product=new mongoose.model("Product",ProductSchema)


const app=express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
const port=4500;
// create
app.post('/api/v1/product/new',async (req,res)=>{
    const product=await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})
// Read
app.get('/api/v1/products',async (req,res)=>{
    const  products=await Product.find()
    res.status(200).json({
        success:true,
        products
    })
})
// update
app.put('/api/v1/product/:id', async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            useFindAndModify: false,  // This should be set to false, or you can omit it since it's deprecated.
            runValidators: true
        });

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
// delete
app.delete('/api/v1/product/:id', async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

app.listen(port,()=>[
    console.log("server is running on port",port)
])
