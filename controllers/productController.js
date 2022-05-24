const {Product, Order} = require('../models/models')
const ApiError = require('../error/ApiError')

class productController{
    async create(req, res){
        try{
            const {
                product_name,
                product_cost
            } = req.body
    
            const product = await Product.create({
                product_name,
                product_cost
            })
    
            return res.json(product)
        } catch (e){
            return res.json(e.message)
        }
       
    }

    async getAll(req, res){
        const products = await Product.findAll()
        return res.json(products)
    }

    async getOne(req,res){
        
    }

    addOrderToProduct = (productId, orderId,) =>{
        return Product.findByPk(productId)
            .then( (product) => {
                if (!tag) {
                    ApiError.badRequest('продукта нет')
                    return null
                }
                return Order.findByPk(orderId).then( (order) => {
                    if (!order){
                        ApiError.badRequest('заказа нет')
                        return null
                    }
                    product.addOrder(order)
                    return product
                })
            })
            .catch( (err) => {
                ApiError.internal(err.message)
            })
    }
}

module.exports = new productController()