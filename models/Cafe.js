import { Cafe as CafeMapping } from './mapping.js'

class Cafe {
    async getAll() {
        const cafes = await CafeMapping.findAll({
            order: [
                ['name', 'ASC'],
            ],
        })
        return cafes
    }

    async getOne(id) {
        const cafe = await CafeMapping.findByPk(id)
        if (!cafe) {
            throw new Error('Кофейня не найдена в БД')
        }
        return cafe
    }

    async create(data) {
        const {name, address } = data        
        const exist = await CafeMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Такая кофейня уже есть')
        }
        const cafe = await CafeMapping.create({name, address})
        return cafe
    }

    async update(id, data) {
        const cafe = await CafeMapping.findByPk(id)
        if (!cafe) {
            throw new Error('Кофейня не найдена в БД')
        }
        const {name = cafe.name} = data
        const {address = cafe.address} = data        
        await cafe.update({name,address})
        return cafe
    }

    async delete(id) {
        const cafe = await CafeMapping.findByPk(id)
        if (!cafe) {
            throw new Error('Кофейня не найдена в БД')
        }
        await cafe.destroy()
        return cafe
    }
}

export default new Cafe()