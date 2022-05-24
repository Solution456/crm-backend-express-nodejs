const uuid = require('uuid')
const { Order, Product, Customer, Route } = require('../models/models')
const ApiError = require('../error/ApiError')
const productController = require('../controllers/productController')


class orderController{
    async create(req, res,next){
        try{
            const {
                order_date,
                selectProduct,
                customerCustomerId
             } = req.body
             const order = await Order.create({
                order_serial: uuid.v4(),
                order_date,
                customerCustomerId
            })
            order.addRoute(1)
             
             if(selectProduct){
                 selectProduct.forEach(i => {
                   Product.findByPk(i.product_id).then( (product) => {
                    return order.addProduct(product)
                   }).catch( (er) => {
                       next(ApiError.badRequest(er.message))
                   })
                   
                   
                 })
             }
             return res.json(order)
        } catch (e){
            next(ApiError.badRequest(e.message))
        }

       



    }

    async getAllOrders(req, res, next){
        let orders = await Order.findAll({
            include:[
                {
                    model:Customer,
                    attributes:['customer_name']
                },
                {
                    model:Product,
                    attributes:["product_id","product_name"],
                    through:{
                        attributes:[]
                    },
                    
                },
                {
                    model: Route,
                    attributes:["id","name"],
                    through: {
                        attributes: ["createdAt"]
                    }
                }
            ]
        })
        return res.json(orders)
    }

    async getAllCustomerOrders(req, res,next){
        let Customer_id =  req.params['id']
        let orders = await Order.findAll({
            where: {
                customerCustomerId: Customer_id,
            },
            include:[
                {
                    model: Product, 
                    attributes:["product_id", "product_name"],
                    through: {
                        attributes: [],
                      },
                    
                },
                {
                    model: Route,
                    attributes:["id","name"],
                    through: {
                        attributes: ["createdAt"]
                    }
                }
            ]
        })

        return res.json(orders)
        
    }

    async getOne(req,res){
       const order_id =  req.params['id']
       let order = await Order.findByPk(order_id,{
           include: [
               {
                   model: Product,
                   attributes:["product_id", "product_name", "product_cost"],
                   through: {
                       attributes: []
                   }
               },
               {
                   model: Route,
                   attributes:["id","name"],
                   through: {
                       attributes: ["createdAt"]
                   }
               }
           ]
       })
       return res.json(order)
    }

    async updateOne(req, res,next){
        try{
            const order_id = parseInt(req.params['id'],10)
            const {route, status} = req.body

            const order = await Order.findByPk(order_id)
            if(order){
               order.update(
                    {order_status: status},
                ).then(() =>{
                    order.save()
                    order.addRoute(route)
                    return res.json(order)
                }).catch(er => {
                    next(ApiError.badRequest(er.message))
                })
            }
            

        }catch(e){
            next(ApiError.badRequest(e.message))
        }
       

    }
}

module.exports = new orderController()