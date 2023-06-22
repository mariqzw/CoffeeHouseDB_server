import OrderModel from '../models/Order.js'
import AppError from '../errors/AppError.js'

class Order {
    async getAll(req, res, next) {
        try {
            const {employeeId = null} = req.params            
            const options = {employeeId}
            const orders = await OrderModel.getAll(options)
            res.json(orders)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }




    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id заказа')
            }
            const order = await OrderModel.getOne(req.params.id)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const order = await OrderModel.create(req.body)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id заказа')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const order = await OrderModel.update(req.params.id, req.body)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id заказа')
            }
            const order = await OrderModel.delete(req.params.id)
            res.json(order)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Order()