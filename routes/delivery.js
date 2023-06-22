import express from 'express'
import DeliveryController from '../controllers/Delivery.js'

const router = new express.Router()
router.get('/getall/employeeId/:employeeId([0-9]+)', DeliveryController.getAll)
router.get('/getall', DeliveryController.getAll)
//router.get('/getall/:quantity([0-9]+)', DeliveryController.getAll)
router.get('/getone/:id([0-9]+)', DeliveryController.getOne)
router.post('/create', DeliveryController.create)
router.put('/update/:id([0-9]+)', DeliveryController.update)
router.delete('/delete/:id([0-9]+)', DeliveryController.delete)


export default router