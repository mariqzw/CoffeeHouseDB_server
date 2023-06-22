import express from 'express'

import cafe from './cafe.js'
import employee from './employee.js'
import drink from './drink.js'
import delivery from './delivery.js'
import order from './order.js'
import dessert from './dessert.js'

const router = new express.Router()

router.use('/cafe', cafe)
router.use('/employee', employee)
router.use('/drink', drink)
router.use('/delivery', delivery)
router.use('/order', order)
router.use('/dessert', dessert)

export default router