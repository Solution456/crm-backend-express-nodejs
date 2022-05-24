const Router = require('express')
const routeController = require('../controllers/routeController')
const router = new Router()


router.post('/',routeController.create)
router.get('/',)
router.get('/:id',)

module.exports = router
