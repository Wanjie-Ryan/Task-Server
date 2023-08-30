const UserModel = require("../../models/RegLog/reglog");
const ProjectsModel = require("../../models/Admin/projects");
const taskModel = require("../../models/Admin/tasks");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const CreateTask = async (req, res) => {
  try {
    const { project, name, description, deadline, status, assign } = req.body;

    const newTask = await taskModel.create(req.body);

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "The Task was created successfully", newTask });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

module.exports = { CreateTask };
