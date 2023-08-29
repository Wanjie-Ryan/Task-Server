const express = require('express');
const router = express.Router()
const AuthMiddleware = require('../../middleware/auth')
const {CreateProject,GetAllProjects,UpdateProject} = require('../../controllers/Admin/projects')



router.route('/createproject').post(AuthMiddleware,CreateProject)
router.route('/getallproject').get(AuthMiddleware,GetAllProjects)
router.route('/updateproject/:id').patch(AuthMiddleware,UpdateProject)




module.exports = router