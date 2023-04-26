const express= require('express')
const router= express.Router()
const {createCartItem,getAllCartItems, getSingleCartItem, getCurrentCartUser, updateCartItems, deleteCartItems}= require('../controllers/cartController')
const {authenticateUser,authorizePermissions}= require('../middleware/authentication')

router.route('/').post(authenticateUser, createCartItem).get([authenticateUser,authorizePermissions('admin')], getAllCartItems)
router.route('/showAllMyCart').get(authenticateUser,getCurrentCartUser)
router.route('/:id').get(authenticateUser, getSingleCartItem).patch(authenticateUser,updateCartItems)
.delete(authenticateUser,deleteCartItems)

module.exports= router