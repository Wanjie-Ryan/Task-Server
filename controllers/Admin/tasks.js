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
    console.log(err);
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
    consoel.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const updateTasks = (req,res)=>{

    res.send('hey')
}

module.exports = { CreateTask, GetAdminTask, GetuserTask,updateTasks };
