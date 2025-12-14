import mongoose from 'mongoose';


const productSizeSchema = mongoose.Schema({
    name :{
        type: String,
        required: true
    }
},{
    timestamps : true
})


const ProductSizeSchema = mongoose.model('ProductSize',productSizeSchema)

export default ProductSizeSchema


