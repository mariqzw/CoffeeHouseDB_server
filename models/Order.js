import { Order as OrderMapping } from './mapping.js'
import { Employee as EmployeeMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Order {
    async getAll(options) {
        const {employeeId} = options        
        const where = {}        
        if (employeeId) where.employeeId = employeeId
        const orders = await OrderMapping.findAndCountAll({
            where,            
            include: [
                {model: EmployeeMapping, as: 'employee'},                
            ],
            order: [
                ['date', 'ASC'],
            ],
        })
        return orders
    }

    async getOne(id) {
        const order = await OrderMapping.findByPk(id, {
            include: [                
                {model: EmployeeMapping, as: 'employee'},                
            ]
        })
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        return order
    }

    async create(data) {            
        const {date, clientname, address, employeeId = null} = data
        const order = await OrderMapping.create({date, clientname, address, employeeId})        
        
        const created = await OrderMapping.findByPk(order.id)
        return created
    }

    async update(id, data) {
        const order = await OrderMapping.findByPk(id);
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            date = order.date,
            clientname = order.clientname,
            address = order.address,
            employeeId = order.employeeId,            
        } = data
        await order.update({date, clientname, address, employeeId})        
        // обновим объект товара, чтобы вернуть свежие данные
        await order.reload()
        return order
    }

    async delete(id) {
        const order = await OrderMapping.findByPk(id)
        if (!order) {
            throw new Error('Заказ не найден в БД')
        }        
        await order.destroy()
        return order
    }
    
}

export default new Order()