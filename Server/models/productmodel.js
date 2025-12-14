import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    images:[
        {
            type:String,
            required: true
        }
    ],
    brand:{
        type: String,
        default: ''
    },
    price:{
        type:Number,
        default:0
    },
    oldPrice:{
        type:Number,
        default:0
    },
    catName:{
        type:String,
        default: ''
    },
    catId:{
        type:String,
        default: ''
    },
    subCatId:{
        type:String,
        default: ''
    },
    subCat:{
        type:String,
        default: ''
    },
    thirdsubCat:{
        type:String,
        default: ''
    },
    thirdsubCatId:{
        type:String,
        default: ''
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:false
    },
    countInStock:{
        type:Number,
        required:true,  
    },
    rating:{
        type:Number,
        default:0
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
    discount:{
        type:Number,
        default:0
    },
    sale:{
        type:Number,
        default:0
    },
    productRam:[
        {
           type:String,
           default:null
        }
    ],
    size:[
        {
            type:String,
            default:null
        }
    ],
    productWeight:[
        {
            type:String,
            default:null
        }
    ],
    sizeChart:{
        type:String,
        default:''
    },
    dateCreated:{
        type:Date,
        default:Date.now
    },
                  
},
   {
      timestamps:true
   }
);

const ProductModel = mongoose.model('product',productSchema);
export default ProductModel;

