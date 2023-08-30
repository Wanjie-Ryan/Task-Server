const express = require('express')
const router = express.Router()
const AuthMiddleware = require("../../middleware/auth");
const {CreateTask,GetAdminTask} = require('../../controllers/Admin/tasks')


router.route('/createtask').post(AuthMiddleware, CreateTask)
router.route('/getadmintask').get(AuthMiddleware, GetAdminTask)



module.exports = router