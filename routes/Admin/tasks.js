const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../../middleware/auth");
const {
  CreateTask,
  GetAdminTask,
  GetuserTask,
  updateTasks,
  DeleteTasks
} = require("../../controllers/Admin/tasks");

router.route("/createtask").post(AuthMiddleware, CreateTask);
router.route("/getadmintask").get(AuthMiddleware, GetAdminTask);
router.route("/getusertask").get(AuthMiddleware, GetuserTask);
router.route("/updatetask/:id").patch(AuthMiddleware, updateTasks);
module.exports = router;
