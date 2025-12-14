import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"]
    },
    email: {
        type: String,
        required: [true, "Provide email"]
    },
    password: {
        type: String,
        required: function() {
            return !this.signUpWithGoogle;
        }
    },
    avatar: {
        type: String,
        default : ""
    },
    mobile: {
        type: String,
        default: null
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    access_token: {
        type: String,
        default: ""
    },
    refresh_token: {
        type: String,
        default: ""
    },
    last_login_date: {
        type: Date,
        default: ""
    },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active"
    },
    address_details: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'address'
      }  
    ],


    // shopping_cart: [
    //   {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'cartProduct'
    //   }
    // ],

    
    orderHistory: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'order'
        }
    ],
    otp:{
        type:String
    },
    otpExpires:{
        type:Date
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER', 'PRODUCT_UPLOADER'],
        default: "USER"
    },
    signUpWithGoogle:{
        type:Boolean,
        default: false
    },
    forgotPasswordVerified:{
        type:Boolean,
        default: false
    }
},
    { timestamps: true }
)


const UserModel = mongoose.model('User', userSchema);
    
export default UserModel ;

