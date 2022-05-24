const sequelize = require('../config/db.config')
const {DataTypes} = require('sequelize')


const User = sequelize.define('user',{
    user_id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING, unique: false},
    role: {type: DataTypes.STRING, defaultValue: "CUSTOMERS"}
})

const Operator = sequelize.define('operator',{
    operator_id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    operator_department: {type: DataTypes.STRING, unique:false},
    operator_cardPass: {type: DataTypes.INTEGER}
})

const Customer = sequelize.define('customer',{
    customer_id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    customer_name: {type: DataTypes.STRING, allowNull:false},
    customer_organisation: {type: DataTypes.STRING, unique:false, allowNull:false},
    customer_phone: {type: DataTypes.STRING, unique:true, allowNull:false},
    customer_address: {type: DataTypes.STRING, allowNull:false},

})

const Order = sequelize.define('order',{
    order_id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    order_date: {type: DataTypes.DATE},
    order_serial: {type: DataTypes.STRING, unique:true, allowNull:false},
    order_status: {type: DataTypes.STRING, defaultValue:"ACCEPTED"},
    
})

const Order_Product = sequelize.define('order_product', {}, {timestamps:false})

const Product = sequelize.define('product',{
    product_id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    product_name: {type: DataTypes.STRING, unique:true, allowNull:false},
    product_cost: {type: DataTypes.INTEGER, allowNull:false},
},{ timestamps: false })

const Route = sequelize.define('route',{
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name:{type: DataTypes.STRING, unique:true, allowNull:false}
}, {timestamps:false})




User.hasOne(Operator)
Operator.belongsTo(User)

User.hasOne(Customer)
Customer.belongsTo(User)


Customer.hasMany(Order)
Order.belongsTo(Customer)

Order.belongsToMany(Product, {
    through: "order_product",
})

Product.belongsToMany(Order, {
    through: "order_product",
})

Order.belongsToMany(Route, {
    through: "order_route"
})

Route.belongsToMany(Order,{
    through: 'order_route'
})


module.exports = {
    User, Operator, Customer, Order, Product, Route
}