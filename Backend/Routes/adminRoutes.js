const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer'); 
const { createCampaign, getCampaign, adminLoginController, reqestedHelpController, updateCampaign, deleteCampaign, deleteHelpRequest } = require('../controllers/adminController');
const { isAdminAuthenticated } = require('../middleware/auth');


router.get('/campaigns', getCampaign);


router.post('/login', adminLoginController);

router.get('/requestedHelp', isAdminAuthenticated, reqestedHelpController);
router.delete('/requestedHelp/:id', isAdminAuthenticated, deleteHelpRequest);
router.post('/campaigns', isAdminAuthenticated, upload.single('image'), createCampaign);
router.put('/campaigns/:id', isAdminAuthenticated, upload.single('img'), updateCampaign);
router.delete('/campaigns/:id', isAdminAuthenticated, deleteCampaign);
module.exports = router;
