const express = require("express");
const router = express.Router();
const {
  Register,
  Login,
  UpdateProfile,
  getSingleUser,
  GetUserRole,
  verifyToken,
} = require("../../controllers/Authentication/regLog");
const AuthMiddleware = require("../../middleware/auth");

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/updateprofile/:id").patch(AuthMiddleware, UpdateProfile);
router.route("/singleuser/:id").get(AuthMiddleware, getSingleUser);
router.route('/userrole').get(AuthMiddleware,GetUserRole)
router.route("/verify").get(verifyToken);

module.exports = router;
