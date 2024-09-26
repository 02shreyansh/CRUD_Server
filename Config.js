const mongoose=require("mongoose")
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
const Product=mongoose.model("Product",ProductSchema)

module.exports=Product
