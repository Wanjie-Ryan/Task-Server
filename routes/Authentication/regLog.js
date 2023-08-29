const express = require('express')
const router = express.Router()
const {Register,Login,UpdateProfile,getSingleUser} = require('../../controllers/Authentication/regLog')
const AuthMiddleware =  require('../../middleware/auth')

router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/updateprofile/:id').patch(AuthMiddleware,UpdateProfile)
router.route('/singleuser/:id').get(getSingleUser)


module.exports = router