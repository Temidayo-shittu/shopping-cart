const mongoose= require('mongoose')

const ProductSchema= new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Please provide product name"],
        maxlength: [100, "Name must not be more than 100 characters"],
      },
      price: {
        type: Number,
        required: [true, "Please provide product price"],
        default: 0,
      },
      quantity: {
        type: Number,
        required: [true, "Please provide number of products"],
        default: 0,
      },
      description: {
        type: String,
        required: [true, "Please provide product description"],
        maxlength: [1000, "Description must not be more than 1000 characters"],
      },
      category: {
        type: String,
        required: [true, "Please provide product category"],
        enum: ["office", "kitchen", "bedroom"],
      },
      company: {
        type: String,
        required: [true, "Please provide company name"],
        enum: {
          values: ["ikea", "liddy", "marcos"],
          message: "{VALUE} is not supported",
        },
      },
      featured: {
        type: Boolean,
        default: false,
      },
      freeShipping: {
        type: Boolean,
        default: false,
      },
      inventory: {
        type: Number,
        required: true,
        default: 15,
      },
      averageRating: {
        type: Number,
        default: 0,
      },
      numOfReviews: {
        type: Number,
        default: 0,
      },
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
},{timestamps: true})

ProductSchema.virtual("carts", {
  ref: "Cart",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

ProductSchema.pre('remove',async function(next){
  await this.model('Cart').deleteMany({product:this._id})
})

module.exports= mongoose.model('Product',ProductSchema)