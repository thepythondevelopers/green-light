var express = require('express')
var router = express.Router()
const { check} = require("express-validator");
const User = require("../models/user");
const {signup,socialLogin,signin,forget_password,change_password,accountDelete,accountDeactivate,accountActivate,logout} = require("../controllers/auth");
const {verifyToken} = require("../middleware/auth");

router.post("/sign-up",[
    check("email").isLength({max : 255}).isEmail().custom((value, {req}) => {
        return new Promise((resolve, reject) => {
          User.findOne({email:req.body.email}, function(err, user){
            if(err) {
              reject(new Error('Server Error'))
            }
            if(Boolean(user)) {
              reject(new Error('E-mail already in use'))
            }
            resolve(true)
          });
        });
      }).notEmpty(),
      check("display_name").custom((value, {req}) => {
        return new Promise((resolve, reject) => {
          User.findOne({display_name:req.body.display_name}, function(err, user){
            if(err) {
              reject(new Error('Server Error'))
            }
            if(Boolean(user)) {
              reject(new Error('Display Name already in use'))
            }
            resolve(true)
          });
        });
      }).notEmpty()
    
],signup);

router.post("/sign-in",[
    check("email").isLength({max : 255}).isEmail().notEmpty(),
      check("password").isLength({max : 255}).notEmpty(),
  ],signin);

  router.post("/social-login",socialLogin);
  

   router.post("/forget-password",[
     check("email").isLength({max : 255}).isEmail().notEmpty()
   ],forget_password);
  
  router.post("/change-password/:password_reset_token",[
    check("token").notEmpty(),
    check("password").isLength({max : 255}).notEmpty(),
  ],change_password);
  
  
  
router.post("/account-delete",verifyToken,accountDelete);  
router.post("/account-deactivate",verifyToken,accountDeactivate);  
router.post("/account-activate",verifyToken,accountActivate);
router.post("/logout",verifyToken,logout);


module.exports = router;
