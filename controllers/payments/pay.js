const payment = require('../../models/payments/pay')
const UserModel = require("../../models/RegLog/reglog");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");



const CreatePayment =(req,res)=>{

    res.send('payment created')
}


module.exports ={CreatePayment}