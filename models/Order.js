const mongoose = require("mongoose");

const SingleOrderItemSchema= new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    cart:{
        type: mongoose.Schema.ObjectId,
        ref: 'Cart',
        required: true
    }
})

const OrderSchema= new mongoose.Schema({
    tax:{
        type:Number,
        required:true
    },
    shippingFee:{
        type:Number,
        required:true
    },
    subTotal:{
        type:Number,
        required:true
    },
    total:{
        type:Number,
        required:true
    },
    orderItems:[SingleOrderItemSchema],
    status: {
        type: String,
        enum:['pending','failed','paid','delivered','cancelled'],
        default:'pending'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    clientSecret: {
        type: String,
       
    },
    paymentIntentId: {
        type: String
    }
},{timestamps:true})

module.exports= mongoose.model('Order',OrderSchema)