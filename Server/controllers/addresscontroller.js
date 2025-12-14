import mongoose from "mongoose";
import AddressModel from "../models/adressmodel.js";
import UserModel from "../models/usermodel.js";
// import Address from "../../Client/src/Pages/MyAccount/Address.jsx";




export async function addAddressController (request, response) {

try {
    const {address_line1, city, state, pincode, country, mobile,landmark, addressType } = request.body;
    const userId = request.userId;  
if(!address_line1 || !city || !state || !pincode || !country || !mobile ){
     return response.status(400).json({
      message: "All fields are required",
      error: true,
      success: false,
    });
}
    
const address = new AddressModel({
    address_line1,
    city,
    state,
    pincode,
    country,
    mobile,
    userId,
    landmark,
    addressType,
    
});

 const savedAddress = await address.save();


 const updateUserAddress = await UserModel.updateOne({_id : userId},{
    $push : {
        address_details : savedAddress?._id
    }
 }) 

   return response.status(200).json({
            data : savedAddress,
            message : 'Address added successfully',
            error : false,
            success: true
        });
    
} catch (error) {
     return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
}


}

export async function getAddressController (request, response) {
    try {
      const userId = request.userId;
      const address = await AddressModel.find({userId: userId});

       return response.status(200).json({
                error: false,
                  success: true,
                  data: address
            })

    } catch (error) {
     return response.status(500).json({
         message: error.message || error,
         error: true,
         success: false
     })
    }
}

// export async function selectAddressController (request, response) {
//         try {
//             const addressId = request.params.id;
//             const userId = request.userId;

//             if (!mongoose.Types.ObjectId.isValid(addressId)) {
//                 return response.status(400).json({
//                     message: "Invalid address ID",
//                     error: true,
//                     success: false
//                 });
//             }

//             const address = await AddressModel.findOne({
//                 _id: addressId,
//                 userId: userId
//             });

//             if(!address){
//                 return response.status(404).json({
//                 message: "Address not found",
//                 error: true,
//                 success: false
//             });
//             }

//             // Deselect all addresses for the user
//             await AddressModel.updateMany(
//                 { userId: userId },
//                 { selected: false }
//             );

//             // Select the specified address
//             const updateAddress = await AddressModel.findByIdAndUpdate(
//                 addressId,
//                 { selected: true },
//                 { new: true }
//             );

//             return response.status(200).json({
//                 error: false,
//                 success: true,
//                 address: updateAddress
//             });

//         } catch (error) {
//             return response.status(500).json({
//                 message: error.message || error,
//                 error: true,
//                 success: false
//             });
//         }
// }

export const deleteAddressController = async (req,res)=>{
    try {
        const userId = req.userId;
        const _id = req.params.id;

        if(!_id){
            return res.status(400).json({
                message : "Provide_id",
                error : true,
                success: false
            })
        }

        const deleteItem = await AddressModel.deleteOne({
            _id : _id,
            userId : userId
        })

        if(!deleteItem){
          return res.status(404).json({
              message :"The address is not found",
            error : true,
            success: false
          })
        }

        return res.json({
            message : "Address removed",
            error : false,
            success: true,
            data : deleteItem
        })

    } catch (error) {
       return res.status(500).json({
        message: error.message || error,
        error : true,
        success: false
       }) 
    }
}

export const getSingleAddressController = async (req,res)=>{
    try {
        const id = req.params.id;
        const address = await AddressModel.findOne({_id:id})

        if(!address){
          return res.status(404).json({
        message: "Address not found",
        error : true,
        success: false
       })  
        }

         return res.status(200).json({
        error : false,
        success: true,
        address: address
       })  


    } catch (error) {
         return res.status(500).json({
        message: error.message || error,
        error : true,
        success: false
       }) 
    }
}


export async function editAddress(req, res) {
    try {
        const id = req.params.id;
        const userId = req.userId;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid address ID",
                error: true,
                success: false
            });
        }

        const { address_line1, city, state, pincode, country, mobile, landmark, addressType } = req.body;

        if (!address_line1 || !city || !state || !pincode || !country || !mobile) {
            return res.status(400).json({
                message: "All required fields must be provided",
                error: true,
                success: false,
            });
        }

        const existingAddress = await AddressModel.findOne({ _id: id, userId: userId });

        if (!existingAddress) {
            return res.status(404).json({
                message: "Address not found or does not belong to user",
                error: true,
                success: false
            });
        }

        const address = await AddressModel.findByIdAndUpdate(
            id,
            {
                address_line1: address_line1,
                city: city,
                state: state,
                pincode: pincode,
                country: country,
                mobile: mobile,
                landmark: landmark,
                addressType: addressType
            },
            { new: true }
        );

        return res.json({
            message: "Address Updated successfully",
            error: false,
            success: true,
            address: address
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


