import DeliveryModel from '../models/Delivery.js'
import AppError from '../errors/AppError.js'

class Delivery {
    async getAll(req, res, next) {
        try {
            const {employeeId = null} = req.params            
            const options = {employeeId}
            const deliverys = await DeliveryModel.getAll(options)
            res.json(deliverys)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }




    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id поставки')
            }
            const delivery = await DeliveryModel.getOne(req.params.id)
            res.json(delivery)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const delivery = await DeliveryModel.create(req.body)
            res.json(delivery)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id поставки')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const delivery = await DeliveryModel.update(req.params.id, req.body)
            res.json(delivery)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id поставки')
            }
            const delivery = await DeliveryModel.delete(req.params.id)
            res.json(delivery)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Delivery()