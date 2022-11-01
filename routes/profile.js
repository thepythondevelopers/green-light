var express = require('express')
var router = express.Router()
const { check} = require("express-validator");
const User = require("../models/user");
const {personalInformation,personalPreferences,professionalInformation,locationInformation} = require("../controllers/auth");
const {verifyToken} = require("../middleware/auth");

router.post("/personal-information",personalInformation);
router.post("/personal-preferences",personalPreferences);
router.post("/professional-information",professionalInformation);
router.post("/location-information",locationInformation);


module.exports = router;
