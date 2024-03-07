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

const GetAdminTask = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized" });
    }

    const decodedToken = jwt.verify(token, process.env.user_secret_key);
    const userId = decodedToken.userId;

    const findOneUser = await UserModel.findById(userId);

    if (!findOneUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "User has not been found" });
    } else if (findOneUser.role != "Admin") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Cannot perform this request" });
    } else if (findOneUser.role === "Admin") {
      const tasks = await taskModel
        .find({})
        .populate("project", "name")
        .populate("assign", "name");

      return res
        .status(StatusCodes.OK)
        .json({ msg: "Tasks fetched sucessfully", tasks });
    }
  } catch (err) {
    // console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const GetuserTask = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized" });
    }

    const decodedToken = jwt.verify(token, process.env.user_secret_key);
    const userId = decodedToken.userId;

    const findOneUser = await UserModel.findById(userId);

    if (!findOneUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "User has not been found" });
    } else if (findOneUser.role != "Member") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Cannot perform this request" });
    } else if (findOneUser.role === "Member") {
      const tasks = await taskModel
        .find({})
        .populate("project", "name")
        .populate("assign", "name");

      return res
        .status(StatusCodes.OK)
        .json({ msg: "Tasks fetched sucessfully", tasks });
    }
  } catch (err) {
    // console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const updateTasks = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized" });
    }

    const decodedToken = jwt.verify(token, process.env.user_secret_key);
    const userId = decodedToken.userId;

    const findOneUser = await UserModel.findById(userId);

    if (!findOneUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "User has not been found" });
    } else if (findOneUser.role != "Member") {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Cannot perform this request" });
    } else if (findOneUser.role === "Member") {
      const { status } = req.body;
      const { id: taskId } = req.params;

      const updateSingleTask = await taskModel.findByIdAndUpdate(
        { _id: taskId },
        req.body,
        { new: true, runValidators: true }
      );

      if (!updateSingleTask) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ msg: "Task not found" });
      }

      return res
        .status(StatusCodes.OK)
        .json({ msg: "Task was updated sucessfully", updateSingleTask });
    }
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const DeleteTasks = async (req, res) => {
  try {
    const { id: taskId } = req.params;

    const deleteTask = await taskModel.findByIdAndDelete(taskId);
    if (!deleteTask) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Task of id: ${taskId} was not found` });
    }

    return res
      .status(StatusCodes.OK)
      .json({ msg: `Task of id ${taskId} was deleted successfully` });
  } catch (err) {
    // console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

module.exports = {
  CreateTask,
  GetAdminTask,
  GetuserTask,
  updateTasks,
  DeleteTasks,
};
