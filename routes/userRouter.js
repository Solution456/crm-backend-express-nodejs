const Router = require('express')
const userController = require('../controllers/userController')
const router = new Router()

const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration', userController.registraiton)
router.post('/login', userController.login)
router.post('/createOperator',authMiddleware,userController.CreateOperator)
router.get('/auth', authMiddleware,userController.check)

module.exports = router