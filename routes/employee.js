import express from 'express'
import EmployeeController from '../controllers/Employee.js'

const router = new express.Router()

/*
 * Сотрудники
 */

// список сотрудников выбранной кофейни
router.get('/getall/cafeId/:cafeId([0-9]+)', EmployeeController.getAll)
router.get('/getall', EmployeeController.getAll)

router.get('/getone/:id([0-9]+)', EmployeeController.getOne)
router.post('/create', EmployeeController.create)
router.put('/update/:id([0-9]+)',  EmployeeController.update)
router.delete('/delete/:id([0-9]+)', EmployeeController.delete)


export default router