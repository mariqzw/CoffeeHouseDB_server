import express from 'express'
import OrderController from '../controllers/Order.js'

const router = new express.Router()

router.get('/getall/employeeId/:employeeId([0-9]+)', OrderController.getAll)
router.get('/getall', OrderController.getAll)

router.get('/getone/:id([0-9]+)', OrderController.getOne)
router.post('/create', OrderController.create)
router.put('/update/:id([0-9]+)', OrderController.update)
router.delete('/delete/:id([0-9]+)', OrderController.delete)


export default router