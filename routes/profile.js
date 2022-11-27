var express = require('express')
var router = express.Router()
const { check} = require("express-validator");
const User = require("../models/user");
const {personalInformation,personalPreferences,professionalInformation,locationInformation,profileImage,profileImageDelete,imagePosition,getProfile} = require("../controllers/profile");
const {verifyToken} = require("../middleware/auth");
var multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get("/get-profile",verifyToken,getProfile);

router.post("/personal-information",verifyToken,personalInformation);
router.post("/personal-preferences",verifyToken,personalPreferences);
router.post("/professional-information",verifyToken,professionalInformation);
router.post("/location-information",verifyToken,locationInformation);

router.post("/profile-image",upload.fields([{name:'image',maxCount:1}]),verifyToken,profileImage);
router.post("/image-position",verifyToken,imagePosition);
router.post("/profile-image-delete/:key",verifyToken,profileImageDelete);

module.exports = router;
