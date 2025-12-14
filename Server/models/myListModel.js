import mongoose from "mongoose";

const myListSchema = mongoose.Schema({
  productId: {
    type: String,
    req: true,
  },

  userId: {
    type: String,
    req: true,
  },

  productTitle: {
    type: String,
    req: true,
  },

  image: {
    type: String,
    req: true,
  },

  price: {
    type: String,
    req: true,
  },

  oldPrice: {
    type: String,
    req: true,
  },

  brand: {
    type: String,
    req: true,
  },

  discount: {
    type: String,
    req: true,
  },
}, {
        timestamps: true
    });


    const  MyListModel = mongoose.model('MyList', myListSchema);
    export default MyListModel ;

