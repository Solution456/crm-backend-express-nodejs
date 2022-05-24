const Router = require('express')
const router = new Router()
const productController = require('../controllers/productController')
const auth = require('../middleware/authMiddleware')

router.post('/',auth,productController.create)
router.get('/',auth,productController.getAll)
router.get('/:id',auth,)



module.exports = router