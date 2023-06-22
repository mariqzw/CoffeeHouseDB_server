import { Drink as DrinkMapping } from './mapping.js'

class Drink {
    async getAll(data) {
        let where = {};
        //console.log(data);
        let { price} = data;
        if (price) where.price = price;
        const drinks = await DrinkMapping.findAll({
            where,
            order: [
                ['name', 'ASC'],
            ],
        })
        return drinks
    }

    async getOne(id) {
        const drink = await DrinkMapping.findByPk(id)
        if (!drink) {
            throw new Error('Напиток не найден в БД')
        }
        return drink
    }

    async create(data) {
        const {name, price } = data        
        const exist = await DrinkMapping.findOne({where: {name}})
        if (exist) {
            throw new Error('Такой напиток уже есть')
        }
        const drink = await DrinkMapping.create({name, price})
        return drink
    }

    async update(id, data) {
        const drink = await DrinkMapping.findByPk(id)
        if (!drink) {
            throw new Error('Напиток не найден в БД')
        }
        const {name = drink.name} = data
        const {price = drink.price} = data        
        await drink.update({name,price})
        return drink
    }

    async delete(id) {
        const drink = await DrinkMapping.findByPk(id)
        if (!drink) {
            throw new Error('Напиток не найден в БД')
        }
        await drink.destroy()
        return drink
    }
}

export default new Drink()