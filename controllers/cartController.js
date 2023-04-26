const Product= require('../models/Product')
const User= require('../models/User')
const {StatusCodes}= require('http-status-codes')
const CustomError= require('../errors')
const {checkPermissions}= require('../utils')
const Cart = require('../models/Cart')

const createCartItem= async(req,res)=>{
    const {product:productId}= req.body
    const isProductValid= await Product.findOne({_id:productId})
    if(!isProductValid) throw new CustomError.NotFoundError(`Product with the given ID: ${productId} doesnt exist`)
    req.body.user= req.user.userId
    const cart= await Cart.create(req.body)
    if(cart.quantity>isProductValid.quantity) throw new CustomError.BadRequestError(`Cart Items requested for, exceeds the stock available!!`)
    res.status(StatusCodes.CREATED).json({cart})
}

const getAllCartItems= async(req,res)=>{
    const carts= await Cart.find({}).populate({path:'product', select:'name price description category company'}).populate({path:'user', select:'name'})
    res.status(StatusCodes.OK).json({carts, count:carts.length})
}

const getSingleCartItem= async(req,res)=>{
    const {id:cartId}= req.params
    const cart= await Cart.findOne({_id:cartId}).populate({path:'product', select:'name price description category company'})
    if(!cart) throw new CustomError.NotFoundError(`Cart with the given ID: ${cartId} doesnt exist`)
    checkPermissions(req.user, cart.user)
    res.status(StatusCodes.CREATED).json({cart})
}

const getCurrentCartUser= async(req,res)=>{
    const cart= await Cart.find({user:req.user.userId})
    res.status(StatusCodes.OK).json({cart, count:cart.length})
}

const updateCartItems= async(req,res)=>{
    const {id:cartId}= req.params
    const{quantity}= req.body
    const cart= await Cart.findOne({_id:cartId})
    if(!cart) throw new CustomError.NotFoundError(`Cart with the given ID: ${cartId} doesnt exist`)
    checkPermissions(req.user, cart.user)
    if(quantity>cart.quantity) throw new CustomError.BadRequestError(`Cart Items requested for, exceeds the stock available!!`)
    cart.quantity= quantity
    await cart.save()
    res.status(StatusCodes.CREATED).json({cart})
}

const deleteCartItems= async(req,res)=>{
    const{id:cartId}= req.params
    const cart= await Cart.findOne({_id:cartId})
    if(!cart) throw new CustomError.NotFoundError(`Cart with the given ID: ${cartId} doesnt exist`)
    checkPermissions(req.user, cart.user)
    await cart.remove()
    res.status(StatusCodes.CREATED).json({msg:"Cart Item successfully deleted"})
}

module.exports= {
    createCartItem,
    getAllCartItems,
    getSingleCartItem,
    getCurrentCartUser,
    updateCartItems,
    deleteCartItems
}