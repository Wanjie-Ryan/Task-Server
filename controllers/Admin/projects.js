const ProjectsModel = require("../../models/Admin/projects");
const UserModel = require("../../models/RegLog/reglog");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const CreateProject = async (req, res) => {
  try {
    const { projectData } = req.body;

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized to create a project" });
    }

    const decodedToken = jwt.verify(token, process.env.user_secret_key);
    const userId = decodedToken.userId;

    const findOneUser = await UserModel.findById(userId);

    // console.log(findOneUser)

    if (!findOneUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "User does not exist, therefore, cannot create the project",
      });
    }

    const newProject = await ProjectsModel.create({
      createdBy: findOneUser._id,
      ...projectData,
    });

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "The project was created successfully", newProject });
  } catch (err) {
    // console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const GetAllProjects = async (req, res) => {
  try {
    const AllProjects = await ProjectsModel.find({});

    if (AllProjects.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "There are no Projects" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Projects fetched are:", AllProjects });
  } catch (err) {
    // console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const UpdateProject = async (req, res) => {
  try {
    const { progress } = req.body;
    const { id: projectId } = req.params;

    const UpdateSingleProject = await ProjectsModel.findByIdAndUpdate(
      { _id: projectId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!UpdateSingleProject) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Project has not been found" });
    }

    return res.status(StatusCodes.OK).json({
      msg: "Project has been updated successfully",
      UpdateSingleProject,
    });
  } catch (err) {
    // console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const DeleteProject = async (req, res) => {
  try {
    const { id: projectId } = req.params;

    const deleteProject = await ProjectsModel.findByIdAndDelete(projectId);
    if (!deleteProject) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `Project of id: ${projectId} was not found` });
    }

    return res
      .status(StatusCodes.OK)
      .json({ msg: `Project of id ${projectId} was deleted successfully` });
  } catch (err) {
    // console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const SearchProject = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    if (!searchTerm) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Please provide a search term" });
    }

    //using regular expression to perform a case-insensitive search

    const regex = new RegExp(searchTerm, "i");

    const foundProjects = await ProjectsModel.find({ name: regex });

    if (foundProjects.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No Project was found" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Projects found are:", foundProjects });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "There seems to be an error, please try again!" });
  }
};

module.exports = {
  CreateProject,
  GetAllProjects,
  UpdateProject,
  DeleteProject,
  SearchProject,
};
