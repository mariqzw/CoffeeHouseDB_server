import EmployeeModel from '../models/Employee.js'
import AppError from '../errors/AppError.js'

class Employee {
    async getAll(req, res, next) {
        try {
            const {cafeId = null} = req.params            
            const options = {cafeId}
            const employees = await EmployeeModel.getAll(options)
            res.json(employees)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }


    async getOne(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id сотрудника')
            }
            const employee = await EmployeeModel.getOne(req.params.id)
            res.json(employee)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async create(req, res, next) {
        try {
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для создания')
            }
            const employee = await EmployeeModel.create(req.body)
            res.json(employee)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async update(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id сотрудника')
            }
            if (Object.keys(req.body).length === 0) {
                throw new Error('Нет данных для обновления')
            }
            const employee = await EmployeeModel.update(req.params.id, req.body)
            res.json(employee)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            if (!req.params.id) {
                throw new Error('Не указан id сотрудника')
            }
            const employee = await EmployeeModel.delete(req.params.id)
            res.json(employee)
        } catch(e) {
            next(AppError.badRequest(e.message))
        }
    }
}

export default new Employee()