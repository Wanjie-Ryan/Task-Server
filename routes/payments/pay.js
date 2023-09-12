const express = require("express");
const router = express.Router();
const { CreatePayment,getAllPayments } = require("../../controllers/payments/pay");
const AuthMiddleware = require("../../middleware/auth");

router.route("/payment").post(AuthMiddleware, CreatePayment);
router.route('/getpayment').get(AuthMiddleware, getAllPayments)

module.exports = router;
