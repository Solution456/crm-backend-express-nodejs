const Router = require('express')
const router = new Router()

const operatorRouter = require('./operatorRouter')
const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const orderRouter = require('./orderRouter')
const customerRouter = require('./customerRouter')
const routeRouter = require('./routeRouter')

router.use('/user',userRouter)
router.use('/product',productRouter)
router.use('/order',orderRouter)
router.use('/customer',customerRouter)
router.use('/operator',operatorRouter)
router.use('/route',routeRouter)


module.exports = router