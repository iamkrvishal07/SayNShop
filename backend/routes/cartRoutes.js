import express from 'express'

import isAuth from '../middleware/isAuth.js'
import { addToCart, getUserCart, UpdateCart } from '../controller/cartController.js'
const cartRoutes = express.Router()

cartRoutes.post('/get',isAuth,getUserCart)
cartRoutes.post('/add',isAuth,addToCart)
cartRoutes.post('/update',isAuth,UpdateCart)


export default cartRoutes