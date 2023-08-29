const express = require('express')
const router = express.Router()
const {Register,Login,UpdateProfile} = require('../../controllers/Authentication/regLog')


router.route('/register').post(Register)
router.route('/login').post(Login)
router.route('/updateprofile/:id').patch(UpdateProfile)



module.exports = router