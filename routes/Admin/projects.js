const express = require("express");
const router = express.Router();
const AuthMiddleware = require("../../middleware/auth");
const {
  CreateProject,
  GetAllProjects,
  UpdateProject,
  DeleteProject,
  SearchProject,
} = require("../../controllers/Admin/projects");

router.route("/createproject").post(AuthMiddleware, CreateProject);
router.route("/getallproject").get(AuthMiddleware, GetAllProjects);
router.route("/updateproject/:id").patch(AuthMiddleware, UpdateProject);
router.route("/deleteproject/:id").delete(AuthMiddleware, DeleteProject);
router.route("/searchproject").get(SearchProject);

module.exports = router;
