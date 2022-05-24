const ApiError = require('../error/ApiError')
const {Operator} = require('../models/models')

class operatorController{
    async create(req, res){
      
    }

    async getAll(req, res){
        
    }

    async getOne(req,res,next){
        const id = req.params['id']
        
        const operator = await Operator.findOne({
            where: {
                userUserId: id
            }
        })
        if(!operator){
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        
        return res.json(operator)
    }
    }

module.exports = new operatorController()