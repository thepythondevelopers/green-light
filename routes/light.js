var express = require('express')
var router = express.Router()
const { check} = require("express-validator");

const {saveLight} = require("../controllers/light");
const {verifyToken} = require("../middleware/auth");


router.post("/save-light",verifyToken,saveLight);

module.exports = router;

