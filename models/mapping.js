import sequelize from '../sequelize.js'
import database from 'sequelize'

const { DataTypes } = database

/*
 * Описание моделей
 */

// модель «Кофейня», таблица БД «cafe»
const Cafe = sequelize.define('cafe', 

{
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    address: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
}, 
{
    tableName: 'cafe',
  })

// модель «Сотрудник», таблица БД «employee»
const Employee = sequelize.define('employee', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    position: {type: DataTypes.STRING},
    name: {type: DataTypes.STRING},
    surname: {type: DataTypes.STRING},
    patronymic: {type: DataTypes.STRING},
    contacts: {type: DataTypes.STRING},
},
{
    tableName: 'employee',
  })

// модель «Поставщик», таблица БД «supplier»
const Supplier = sequelize.define('supplier', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    phone_number: {type: DataTypes.STRING},
},
{
    tableName: 'supplier',
  })

// модель «Поставка», таблица БД «delivery»
const Delivery = sequelize.define('delivery', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE},
    quantity: {type: DataTypes.INTEGER},
},
{
    tableName: 'delivery',
  })

// модель «Позиция поставки», таблица БД «delivery_position»
const DeliveryPosition = sequelize.define('delivery_position', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    price: {type: DataTypes.FLOAT},
    quantity: {type: DataTypes.STRING},
},
{
    tableName: 'delivery_position',
  })

  // модель «Ингредиент», таблица БД «ingredient»
const Ingredient = sequelize.define('ingredient', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
},
{
    tableName: 'ingredient',
  })


// модель «Ингредиент_напиток», таблица БД «ingredientdrink»
const IngredientDrink = sequelize.define('ingredientdrink', {
    quantity: {type: DataTypes.STRING},
},
{
    tableName: 'ingredientdrink',
  })

// модель «Напиток», таблица БД «drink»
const Drink = sequelize.define('drink', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    price: {type: DataTypes.FLOAT},
},
{
    tableName: 'drink',
  })

// модель «Десерт», таблица БД «dessert»
const Dessert = sequelize.define('dessert', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING},
    price: {type: DataTypes.FLOAT},
},
{
    tableName: 'dessert',
  })

 // модель «Заказ_Десерт», таблица БД «order_dessert»
const OrderDessert = sequelize.define('order_dessert', {
    quantity: {type: DataTypes.INTEGER},
},
{
    tableName: 'order_dessert',
  })

// модель «Заказ_Напиток», таблица БД «order_drink»
const OrderDrink = sequelize.define('order_drink', {
    quantity: {type: DataTypes.INTEGER},
    volume: {type: DataTypes.INTEGER},
},
{
    tableName: 'order_drink',
  })

// модель «Заказ», таблица БД «order»
const Order = sequelize.define('order', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    date: {type: DataTypes.DATE},
    clientname: {type: DataTypes.STRING},
    address: {type: DataTypes.STRING},
},
{
    tableName: 'order',
  })

  Cafe.hasMany(Employee, {onDelete: 'RESTRICT'})
  Employee.belongsTo(Cafe)

  Supplier.hasMany(Delivery, {onDelete: 'RESTRICT'})
  Delivery.belongsTo(Supplier)

  Employee.hasMany(Delivery, {onDelete: 'RESTRICT'})
  Delivery.belongsTo(Employee)

  Employee.hasMany(Order, {onDelete: 'RESTRICT'})
  Order.belongsTo(Employee)

  Order.hasMany(OrderDrink, {onDelete: 'RESTRICT'})
  OrderDrink.belongsTo(Order)

  Drink.hasMany(OrderDrink, {onDelete: 'RESTRICT'})
  OrderDrink.belongsTo(Drink)

  Order.hasMany(OrderDessert, {onDelete: 'RESTRICT'})
  OrderDessert.belongsTo(Order)

  Dessert.hasMany(OrderDessert, {onDelete: 'RESTRICT'})
  OrderDessert.belongsTo(Dessert)

export {
    Cafe,
    Employee,
    Supplier,
    Delivery,
    DeliveryPosition,
    Ingredient,
    IngredientDrink,
    Drink,
    Dessert,
    OrderDrink,
    OrderDessert,
    Order
}
