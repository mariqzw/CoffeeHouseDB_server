import DrinkModel from '../models/Drink.js'
import AppError from '../errors/AppError.js'

class Drink {
    async getAll(req, res, next) {
        try {
            let {price = null} = req.params;
            //console.log(price);
            let data = {price}
            const drinks = await DrinkModel.getAll(data)
            res.json(drinks)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id напитка')
            }
            const drink = await DrinkModel.getOne(req.params.id)
            res.json(drink)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (!req.body.name) {
                throw new Error('Нет названия напитка')
            }
            const drink = await DrinkModel.create(req.body)
            res.json(drink)
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
            const drink = await DrinkModel.update(req.params.id, req.body)
            res.json(drink)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id напитка')
            }
            const drink = await DrinkModel.delete(req.params.id)
            res.json(drink)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Drink()