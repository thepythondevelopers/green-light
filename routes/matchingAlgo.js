var express = require('express')
var router = express.Router()
const { check} = require("express-validator");

const {matchingAlgo} = require("../controllers/matchingAlgo");
const {verifyToken} = require("../middleware/auth");


router.get("/matching-algo",verifyToken,matchingAlgo);

module.exports = router;

