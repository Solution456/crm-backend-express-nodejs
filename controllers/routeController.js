const {Route} = require('../models/models')
const ApiError = require('../error/ApiError')

class routeController{
    async create(req, res){
        try{
            const {
                name,
            } = req.body
    
            const route = await Route.create({
                name
            })
    
            return res.json(route)
        } catch (e){
            return res.json(e.message)
        }
    }

    async getAll(req, res){
        
    }

    async getOne(req,res){
        
    }
}

module.exports = new routeController()