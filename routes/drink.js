import express from 'express'
import DrinkController from '../controllers/Drink.js'

const router = new express.Router()

router.get('/getall', DrinkController.getAll)
router.get('/getone/:id([0-9]+)', DrinkController.getOne)
router.get('/getall/:price([0-9]+)', DrinkController.getAll)
router.post('/create',  DrinkController.create)
router.put('/update/:id([0-9]+)', DrinkController.update)
router.delete('/delete/:id([0-9]+)', DrinkController.delete)

export default router