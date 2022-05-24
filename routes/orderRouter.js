const Router = require('express')
const router = new Router()
const orderController = require('../controllers/orderController')
const auth = require('../middleware/authMiddleware')

router.post('/',auth,orderController.create)
router.get('/all/:id',auth,orderController.getAllCustomerOrders)
router.get('/:id',auth,orderController.getOne)
router.get('/',orderController.getAllOrders)
router.put('/update/:id',orderController.updateOne)




module.exports = router