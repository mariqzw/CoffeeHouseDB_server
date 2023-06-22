import CafeModel from '../models/Cafe.js'
import AppError from '../errors/AppError.js'

class Cafe {
    async getAll(req, res, next) {
        try {
            const cafes = await CafeModel.getAll()
            res.json(cafes)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id кафе')
            }
            const cafe = await CafeModel.getOne(req.params.id)
            res.json(cafe)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (!req.body.name) {
                throw new Error('Нет названия кафе')
            }
            const cafe = await CafeModel.create(req.body)
            res.json(cafe)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id кафе')
            }
            if (!req.body.name) {
                throw new Error('Нет названия кафе')
            }
            const cafe = await CafeModel.update(req.params.id, req.body)
            res.json(cafe)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id кафе')
            }
            const cafe = await CafeModel.delete(req.params.id)
            res.json(cafe)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Cafe()