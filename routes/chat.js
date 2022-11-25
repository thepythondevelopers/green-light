var express = require('express')
var router = express.Router()
const { check} = require("express-validator");

const {saveChat,getChat} = require("../controllers/chat");
const {verifyToken} = require("../middleware/auth");


router.post("/save-chat",verifyToken,saveChat);
router.get("/get-chat/:user_id",verifyToken,getChat);

module.exports = router;

