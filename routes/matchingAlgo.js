var express = require('express')
var router = express.Router()
const { check} = require("express-validator");

const {matchingAlgo,matchingAlgoDisplayName} = require("../controllers/matchingAlgo");
const {verifyToken} = require("../middleware/auth");



router.get("/matching-algo",verifyToken,matchingAlgo);
router.get("/matching-algo-display-name",verifyToken,matchingAlgoDisplayName);

module.exports = router;

