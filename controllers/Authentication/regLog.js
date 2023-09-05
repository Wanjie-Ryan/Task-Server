const AuthModel = require("../../models/RegLog/reglog");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Register = async (req, res) => {
  try {
    const { name, email, contact, company, role, password } = req.body;

    if (!name || !email || !contact || !company || !role || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "please fill all the fields" });
    }

    const newUser = await AuthModel.create(req.body);

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "user created successfully" });
  } catch (err) {
    // console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later" });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Provide all the fields" });
    }

    const UserEmail = await AuthModel.findOne({ email });

    if (!UserEmail) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "The Email Provided cannot be found" });
    }

    const correctPassword = await UserEmail.checkpwd(password);

    if (!correctPassword) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "Incorrect password" });
    }

    const UserLogin = UserEmail.toObject();
    delete UserLogin.password;
    delete UserLogin.company;
    delete UserLogin.contact;
    delete UserLogin.email;

    const token = jwt.sign(
      { userId: UserLogin._id },
      process.env.user_secret_key,
      { expiresIn: "1d" }
    );

    return res
      .status(StatusCodes.OK)
      .json({ msg: `Login Successful`, UserLogin, userToken: token });
  } catch (err) {
    // console.log(err)

    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const UpdateProfile = async (req, res) => {
  try {
    const { photo } = req.body;
    const { id: userid } = req.params;

    // if (password) {
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(password, salt);
    //   req.body.password = hashedPassword;
    // }

    const updateUser = await AuthModel.findByIdAndUpdate(
      { _id: userid },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: `The user has not been found` });
    }

    const updateUserObj = updateUser.toObject();
    delete updateUserObj._id;
    delete updateUserObj.name;
    delete updateUserObj.email;
    delete updateUserObj.contact;
    delete updateUserObj.company;
    delete updateUserObj.role;
    delete updateUserObj.password;

    return res.status(StatusCodes.OK).json({
      msg: "Your Profile has been updated Successfully",
      updateUserObj,
    });
  } catch (err) {
    // console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const { id: userid } = req.params;

    const singleUser = await AuthModel.findById({ _id: userid });

    if (!singleUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "The User has not been found" });
    }

    const singleuserObj = singleUser.toObject();
    delete singleuserObj._id;
    delete singleuserObj.company;
    // delete singleuserObj.role;
    delete singleuserObj.password;
    return res
      .status(StatusCodes.OK)
      .json({ msg: "Single user fetched successfully", singleuserObj });
  } catch (err) {
    // console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const GetUserRole = async (req, res) => {
  try {
    const { role } = req.query;

    if (!role) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Role Parameter is required" });
    }

    const regex = new RegExp(role, "i");

    const users = await AuthModel.find({ role: regex });

    if (users.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "No user has been found" });
    }

    return res
      .status(StatusCodes.OK)
      .json({ msg: "Users retrieved are the following", users });
  } catch (err) {
    // console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const verifyToken = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const authHeader = req.headers.authorization;
      const token = authHeader.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.user_secret_key);
      req.token = decoded;
      res.json({ type: "success" });
      // next()
    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Token is bad" });
    }
  } catch (err) {
    // res.json({ type: 'error', message: 'Please authenticate', details: err })
    return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid token" });
  }
};

module.exports = {
  Register,
  Login,
  UpdateProfile,
  getSingleUser,
  GetUserRole,
  verifyToken,
};
