const express=require('express');
const router=express.Router();

const upload=require('../middleware/multer');
const { registerController, loginController, reqHelpController } = require('../controllers/userController');
const { isUserAuthenticated } = require('../middleware/auth');


router.post('/register',registerController);


router.post('/login',loginController);


router.post('/helpRequest', isUserAuthenticated, upload.single('image'),reqHelpController );






module.exports=router;