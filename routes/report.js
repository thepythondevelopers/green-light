var express = require('express')
var router = express.Router()
const { check} = require("express-validator");

const {saveReport} = require("../controllers/report");
const {verifyToken} = require("../middleware/auth");


router.post("/save-report",verifyToken,saveReport);

module.exports = router;

