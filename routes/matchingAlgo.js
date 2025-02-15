var express = require('express')
var router = express.Router()
const { check} = require("express-validator");

const {matchingAlgo,matchingAlgoDisplayName} = require("../controllers/matchingAlgo");
const {verifyToken} = require("../middleware/auth");



router.post("/matching-algo",verifyToken,matchingAlgo);
router.post("/matching-algo-display-name",verifyToken,matchingAlgoDisplayName);

module.exports = router;

