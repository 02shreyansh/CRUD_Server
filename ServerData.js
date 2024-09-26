const Product=require('./Config')
const createData=async (req,res)=>{
    const product=await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
}
const readData=async (req,res)=>{
    const products=await Product.find();
    res.status(200).json({
        success:true,
        products
    })
}
const updateData=async (req,res)=>{
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
            useFindAndModify: false,  
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
}
const deleteData=async (req,res)=>{
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
}
module.exports={createData,readData,updateData,deleteData}