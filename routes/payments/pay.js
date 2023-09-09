const express = require('express');
const router = express.Router();
const {CreatePayment} = require('../../controllers/payments/pay')



router.route('/payment').post(CreatePayment)


module.exports = router