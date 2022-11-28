var express = require('express')
var router = express.Router()
const { check} = require("express-validator");

const {saveLight,sentGreenLight,yellowLight,mutualGreenLight,responseLight,test} = require("../controllers/light");
const {verifyToken} = require("../middleware/auth");


router.post("/save-light",verifyToken,saveLight);
router.get("/sent-green-light",verifyToken,sentGreenLight);
router.get("/yellow-light",verifyToken,yellowLight);
router.get("/mutual-green-light",verifyToken,mutualGreenLight);
router.post("/response-light/:id",verifyToken,responseLight);
router.get("/test",test);
module.exports = router;

