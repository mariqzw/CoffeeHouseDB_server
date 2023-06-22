import DessertModel from '../models/Dessert.js'
import AppError from '../errors/AppError.js'

class Dessert {
    async getAll(req, res, next) {
        try {
            let {price = null} = req.params;
            //console.log(price);
            let data = {price}
            const desserts = await DessertModel.getAll(data)
            res.json(desserts)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id напитка')
            }
            const dessert = await DessertModel.getOne(req.params.id)
            res.json(dessert)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (!req.body.name) {
                throw new Error('Нет названия напитка')
            }
            const dessert = await DessertModel.create(req.body)
            res.json(dessert)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id напитка')
            }
            if (!req.body.name) {
                throw new Error('Нет названия напитка')
            }
            const dessert = await DessertModel.update(req.params.id, req.body)
            res.json(dessert)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id напитка')
            }
            const dessert = await DessertModel.delete(req.params.id)
            res.json(dessert)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Dessert()