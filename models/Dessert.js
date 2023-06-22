import { Dessert as DessertMapping } from './mapping.js'

class Dessert {
    async getAll(data) {
        let where = {};
        //console.log(data);
        let { price} = data;
        if (price) where.price = price;
        const desserts = await DessertMapping.findAll({
            where,
            order: [
                ['name', 'ASC'],
            ],
        })
        return desserts
    }

    async getOne(id) {
        const dessert = await DessertMapping.findByPk(id)
        if (!dessert) {
            throw new Error('Десерт не найден в БД')
        }
        return dessert
    }

    async create(data) {
        const {name, price } = data        
        const exist = await DessertMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Такой десерт уже есть')
        }
        const dessert = await DessertMapping.create({name, price})
        return dessert
    }

    async update(id, data) {
        const dessert = await DessertMapping.findByPk(id)
        if (!dessert) {
            throw new Error('Десерт не найден в БД')
        }
        const {name = dessert.name} = data
        const {price = dessert.price} = data        
        await dessert.update({name,price})
        return dessert
    }

    async delete(id) {
        const dessert = await DessertMapping.findByPk(id)
        if (!dessert) {
            throw new Error('Десерт не найден в БД')
        }
        await dessert.destroy()
        return dessert
    }
}

export default new Dessert()