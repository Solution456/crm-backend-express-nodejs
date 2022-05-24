const Router = require('express')
const router = new Router()
const auth = require('../middleware/authMiddleware')
const customerController = require('../controllers/customerController')

router.get('/',auth,customerController.getAll)
router.get('/:id',auth,customerController.getOne)
router.get('/one/:id',auth,customerController.getOneByCustId)



module.exports = router