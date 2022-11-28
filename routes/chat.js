var express = require('express')
var router = express.Router()
const { check} = require("express-validator");

const {saveChat,getChat,test} = require("../controllers/chat");
const {verifyToken} = require("../middleware/auth");


router.post("/save-chat",verifyToken,saveChat);
router.get("/get-chat/:user_id",verifyToken,getChat);
router.get("/test",test);
module.exports = router;

