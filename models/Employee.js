import { Employee as EmployeeMapping } from './mapping.js'
import { Cafe as CafeMapping } from './mapping.js'
import AppError from '../errors/AppError.js'

class Employee {
 
    
    
    async getAll(options) {
        const {cafeId} = options        
        const where = {}        
        if (cafeId) where.cafeId = cafeId
        const employees = await EmployeeMapping.findAndCountAll({
            where,            
            include: [
                {model: CafeMapping, as: 'cafe'},                
            ],
            order: [
                ['name', 'ASC'],
            ],
        })
        return employees
    }

    async getOne(id) {
        const employee = await EmployeeMapping.findByPk(id, {
            include: [                
                {model: CafeMapping, as: 'cafe'},                
            ]
        })
        if (!employee) {
            throw new Error('Сотрудник не найден в БД')
        }
        return employee
    }

    async create(data) {            
        const {name, surname, position, patronymic, contacts, cafeId = null} = data
        const employee = await EmployeeMapping.create({name, surname, position, patronymic, contacts, cafeId})        
        
        const created = await EmployeeMapping.findByPk(employee.id)
        return created
    }

    async update(id, data) {
        const employee = await EmployeeMapping.findByPk(id);
        if (!employee) {
            throw new Error('Сотрудник не найден в БД')
        }
        // подготавливаем данные, которые надо обновить в базе данных
        const {
            name = employee.name,
            surname = employee.surname,
            patronymic = employee.patronymic,
            position = employee.position,
            contacts = employee.contacts,
            cafeId = employee.cafeId,            
        } = data
        await employee.update({name, surname, position, patronymic, contacts, cafeId})        
        // обновим объект товара, чтобы вернуть свежие данные
        await employee.reload()
        return employee
    }

    async delete(id) {
        const employee = await EmployeeMapping.findByPk(id)
        if (!employee) {
            throw new Error('Сотрудник не найден в БД')
        }        
        await employee.destroy()
        return employee
    }
    
}

export default new Employee()