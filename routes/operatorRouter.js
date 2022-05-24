const Router = require('express')
const router = new Router()
const operatorController = require('../controllers/operatorController')
const auth = require('../middleware/authMiddleware')

router.post('/',)
router.get('/',)
router.get('/:id',auth,operatorController.getOne)



module.exports = router