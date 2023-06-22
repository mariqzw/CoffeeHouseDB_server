import express from 'express'
import CafeController from '../controllers/Cafe.js'

const router = new express.Router()

router.get('/getall', CafeController.getAll)
router.get('/getone/:id([0-9]+)', CafeController.getOne)
router.post('/create',  CafeController.create)
router.put('/update/:id([0-9]+)', CafeController.update)
router.delete('/delete/:id([0-9]+)', CafeController.delete)

export default router