const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Customer, Operator} = require('../models/models')

const generateJWT = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: "24h"}
        )
}


class UserController {
    async registraiton(req, res, next){
        const {
            email, 
            password,
            customer_name,
            customer_organisation,
            customer_phone,
            customer_address } = req.body

        if(!email || !password){
            return next(ApiError.badRequest('Неккорректный пароль или email'))
        }
        if(!customer_name || !customer_organisation || !customer_phone || !customer_address){
            return next(ApiError.badRequest('Не все поля заполнены'))
        }
        const candidate = await User.findOne({
            where: {email}
        })
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email, password:hashPassword})
        const customer = await Customer.create({
            userUserId:user.user_id,
            customer_name,
            customer_organisation,
            customer_phone,
            customer_address
        })

        return res.json('Клиент успешно зарегистрирован')

    }

    async CreateOperator(req,res,next){
        const {
            email, 
            password,
            operator_department,
            operator_cardPass } = req.body

        if(!email || !password){
            return next(ApiError.badRequest('Неккорректный пароль или email'))
        }
        if(!operator_department || !operator_cardPass || !password || !email){
            return next(ApiError.badRequest('Не все поля заполнены'))
        }
        const candidate = await User.findOne({
            where: {email}
        })
        if(candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email, password:hashPassword, role:'OPERATOR'})
        const operator = await Operator.create({
            userUserId:user.user_id,
            operator_cardPass,
            operator_department
        })

        return res.json(operator)
    }

    async login(req, res,next){
        try{
            const {email, password} = req.body
            const user = await User.findOne({
                where: {email},
            })
            if(!user){
                return next(ApiError.internal('Пользователь не найден'))
            }
            let comparePassword =  bcrypt.compareSync(password, user.password)
            if (!comparePassword){
                return next(ApiError.internal('Указан неверный пароль'))
            }
            const token = generateJWT(user.user_id,user.email,user.role)
            

            return res.json({
                accessToken:token,
            })

        }catch(er){
            return res.json(er)
        }
        
    }

    async check(req, res, next){
        const token =generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()