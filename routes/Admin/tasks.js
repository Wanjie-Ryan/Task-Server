const express = require('express')
const router = express.Router()
const AuthMiddleware = require("../../middleware/auth");
const {CreateTask} = require('../../controllers/Admin/tasks')


router.route('/createtask').post(AuthMiddleware, CreateTask)




module.exports = router