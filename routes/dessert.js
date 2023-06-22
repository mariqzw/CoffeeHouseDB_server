import express from 'express'
import DessertController from '../controllers/Dessert.js'

const router = new express.Router()

router.get('/getall', DessertController.getAll)
router.get('/getone/:id([0-9]+)', DessertController.getOne)
router.get('/getall/:price([0-9]+)', DessertController.getAll)
router.post('/create',  DessertController.create)
router.put('/update/:id([0-9]+)', DessertController.update)
router.delete('/delete/:id([0-9]+)', DessertController.delete)

export default router