import { Delivery as DeliveryMapping } from './mapping.js'
import { Employee as EmployeeMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Delivery {
    async getAll(options) {
        const {employeeId} = options        
        const where = {}        
        if (employeeId) where.employeeId = employeeId
        const deliverys = await DeliveryMapping.findAndCountAll({
            where,            
            include: [
                {model: EmployeeMapping, as: 'employee'},                
            ],
            order: [
                ['date', 'ASC'],
            ],
        })
        return deliverys
    }

    async getOne(id) {
        const delivery = await DeliveryMapping.findByPk(id, {
            include: [                
                {model: EmployeeMapping, as: 'employee'},                
            ]
        })
        if (!delivery) {
            throw new Error('Поставка не найдена в БД')
        }
        return delivery
    }

    async create(data) {            
        const {date, quantity, employeeId = null} = data
        const delivery = await DeliveryMapping.create({date, quantity, employeeId})        
        
        const created = await DeliveryMapping.findByPk(delivery.id)
        return created
    }

    async update(id, data) {
        const delivery = await DeliveryMapping.findByPk(id);
        if (!delivery) {
            throw new Error('Поставка не найдена в БД')
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            date = delivery.date,
            quantity = delivery.quantity,
            employeeId = delivery.employeeId,            
        } = data
        await delivery.update({date, quantity, employeeId})        
        // обновим объект товара, чтобы вернуть свежие данные
        await delivery.reload()
        return delivery
    }

    async delete(id) {
        const delivery = await DeliveryMapping.findByPk(id)
        if (!delivery) {
            throw new Error('Поставка не найдена в БД')
        }        
        await delivery.destroy()
        return delivery
    }
    
}

export default new Delivery()