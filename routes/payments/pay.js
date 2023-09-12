const express = require('express');
const router = express.Router();
const {CreatePayment} = require('../../controllers/payments/pay')
const AuthMiddleware = require("../../middleware/auth");



router.route('/payment').post(AuthMiddleware,CreatePayment)


module.exports = router