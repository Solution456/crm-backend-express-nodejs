const {Customer, Order, Route, Product} = require('../models/models')
const ApiError = require('../error/ApiError')
class customerController{
    async create(req, res){
        const {
            customer_name,
            customer_organisation,
            customer_phone,
            customer_address 
        } = req.body
        const customer = await Customer.create({
            customer_name, 
            customer_organisation,
            customer_phone,
            customer_address
        })
        return res.json(customer)
        
    }

    async getOneByCustId(req, res){
        const id = req.params['id']
        const customer = await Customer.findByPk(id)

        return res.json(customer)
    }

    async getAll(req, res){
        const customers = await Customer.findAll({
            include:[
                {
                    model:Order,
                    attributes:['order_id','order_serial','order_status','createdAt'],
                    include:[{
                        model:Product,
                        attributes:["product_id","product_name"],
                        through:{
                            attributes:[]
                        },
                    },
                    {
                        model:Route,
                        attributes:["id","name"],
                        through: {
                            attributes: ["createdAt"]
                        },
                    }
                        
                    ]
                },
            ]
        })
        return res.json(customers)
    }

    async getOne(req,res,next){
        const id = req.params['id']
        
        const customer = await Customer.findOne({
            where: {
                userUserId: id
            }
        })
        if(!customer){
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        
        return res.json(customer)
    }
}


module.exports = new customerController()