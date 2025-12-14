import MyListModel from "../models/myListModel.js";

export const addToMyListController = async (req, res) => {
  try {
    const userId = req.userId; //middleware
    const {
         productId, 
        productTitle, 
        image,
         price, 
         oldPrice, 
         brand, 
         discount
         } = req.body;

         const item = await MyListModel.findOne({
            userId: userId,
            productId :productId,
            
         })
         if(item){
            return res.status(400).json({
                message: "items already in my list"
            })
         }

         const MyList = new MyListModel({
        productId, 
        productTitle, 
        image,
         price, 
         oldPrice, 
         brand, 
         discount,
         userId
         })

         const save = await MyList.save();

         return res.status(200).json({
            error: false,
            success: true,
            message: "The product added in the my list",
         })


  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};


export const deleteToMyListController = async (req, res) => {
    try {
        
        const myListItem = await MyListModel.findById(req.params.id);

        if(!myListItem){
            return res.status(404).json({
                error :true,
                success: false,
                message : "The item with this given id was not found"
            })
        }

        const deletedItem = await MyListModel.findByIdAndDelete(req.params.id);

        if(!deletedItem){
            return res.status(404).json({
                error: true,
                 success: false,
                  message: "The items is not deleted"
            })
        }

        return res.status(200).json({
            error: false,
             success: true,
              message : "The item removed form My List"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success: false
        })
    }
}


export const getMyListController = async (req, res) => {
    try {
        
         const userId = req.userId;
          
          const myListItem = await MyListModel.find({
            userId : userId
          })

          return res.status(200).json({
            error: false,
            success: true,
             data: myListItem 
          })

    } catch (error) {
         return res.status(500).json({
            message: error.message || error,
            error: true,
             success: false
         })
    }
}

