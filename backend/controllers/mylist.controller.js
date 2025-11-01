import MyListModel from '../models/myList.model.js';



// Add product in mylist
export const addToMyListController = async (req,res) => {
    try {
        const userId = req.userId;
        const { productId,
              productTitle,
              image,
               rating,
               price,
               oldPrice,
               brand,
               discount 
            } = req.body;

          
            const item = await MyListModel.findOne({
                userId : userId,
                productId : productId
            });

            if(item) {
                return res.status(400).json({
                    message: "Item already in my list"
                });
            }

            const myList = new MyListModel({
                productId: productId,
                productTitle: productTitle,
                image: image,
                 rating: rating,
                 price: price,
                 oldPrice: oldPrice,
                 brand: brand,
                 discount: discount,
                 userId: userId
            });

            const save = await myList.save();

            return res.status(200).json({
                error:false,
                success: true,
                message: "The product added in the my list"
            })




    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}



// delete product from mylist
export const deleteToMyListController = async (req,res) => {
    try {

        const myListItem = await MyListModel.findById(req.params.id);

        if(!myListItem) {
            return res.status(404).json({
                error:true,
                success: false,
                message:"The item with this given id was not found"
            });
        }

        const deletedItem = await MyListModel.findByIdAndDelete(req.params.id);

        if(!deletedItem){
            return res.status(404).json({
                error:true,
                success: false,
                message:"The item is not deleted"
            });
        }

        return res.status(200).json({
            error: false,
            success:true,
            message: "The item removed from My List"
        });



    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }

}


// get product from mylist
export const getMyListController = async (req,res) => {
    try{
         
        const userId = req.userId;
        const myListItems = await MyListModel.find({
            userId: userId
        });

        
        return res.status(200).json({
            error: false,
            success:true,
            data: myListItems
        });

        

    } catch (eror) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}