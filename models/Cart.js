const mongoose= require('mongoose')

const CartSchema= new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide product name"],
        maxlength: [100, "Name must not be more than 100 characters"],
      },
      price: {
        type: Number,
        required: [true, "Please provide price of products"],
        default: 0,
      },
      quantity: {
        type: Number,
        required: [true, "Please provide number of products"],
        default: 0,
      },
      comment: {
        type: String,
        required: [true, "Please provide your views on product"], 
        maxlength: [1000, "Description must not be more than 1000 characters"],
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
      product: {
        type: mongoose.Schema.ObjectId,
        ref:'Product',
        required:true
    }
},{timestamps:true})

module.exports= mongoose.model('Cart',CartSchema)