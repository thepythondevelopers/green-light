var express = require('express')
var router = express.Router()
const { check} = require("express-validator");

const {userList,userDetails} = require("../controllers/adminCustomer");
const {verifyToken,adminroleCheck} = require("../middleware/auth");


router.get("/admin/user-list",verifyToken,adminroleCheck,userList);
router.get("/admin/user-detail/:id",verifyToken,adminroleCheck,userDetails);

module.exports = router;

