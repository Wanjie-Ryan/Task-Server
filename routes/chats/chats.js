const express = require("express");
const router = express.Router();
const { CreateChat, GetChats } = require("../../controllers/chats/chats");
const AuthMiddleware = require("../../middleware/auth");

router.route("/create-chat").post(AuthMiddleware, CreateChat);
router.route("/get-chats").get(AuthMiddleware, GetChats);

module.exports = router;
