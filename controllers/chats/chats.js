const chatModel = require("../../models/chats/chats");
const UserModel = require("../../models/RegLog/reglog");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");

const CreateChat = async (req, res) => {
  try {
    const { chatData } = req.body;
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "You are not authorized to chat" });
    }

    const decodedToken = jwt.verify(token, process.env.user_secret_key);

    const userId = decodedToken.userId;

    const findOneUser = await UserModel.findById(userId);

    if (!findOneUser) {
      return res.status(StatusCodes.NOT_FOUND).json({
        msg: "User does not exist, therefore, cannot chat",
      });
    }

    const newChat = await chatModel.create({
      sentBy: findOneUser._id,
      ...chatData,
    });
    // io.emit('newChat', newChat);

    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "Your message was sent", newChat });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

const GetChats = async (req, res) => {
  try {
    const chats = await chatModel.find().sort({ timestamp: 1 });
    res.status(StatusCodes.CREATED).json({ sucess: "true", chats });
  } catch (err) {
    console.log(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, please try again later" });
  }
};

module.exports = { CreateChat, GetChats };
