const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../../middleware/auth");
const {
  CreateTask,
  GetAdminTask,
  GetuserTask,
  updateTasks,
  DeleteTasks,
  searchTask,
} = require("../../controllers/Admin/tasks");

router.route("/createtask").post(AuthMiddleware, CreateTask);
router.route("/getadmintask").get(AuthMiddleware, GetAdminTask);
router.route("/getusertask").get(AuthMiddleware, GetuserTask);
router.route("/updatetask/:id").patch(AuthMiddleware, updateTasks);
router.route("/deletetask/:id").delete(AuthMiddleware, DeleteTasks);
router.route("/searchtask").get(searchTask);
module.exports = router;
