const express = require('express');
const router = express.Router();


const userController = require('../controllers/Users/userController');

router.post('/userSignUp', userController.userSignUp);
router.post('/userProfileUpdate', userController.userProfileUpdate);
router.post('/userLogin', userController.userLogin);
router.post('/deleteAccount', userController.deleteAccount);
router.post('/logout', userController.logout);
router.post('/favouriteList', userController.favouriteList);
router.post('/addFavourite', userController.addFavourite);
router.post('/editFavourite', userController.editFavourite);
router.post('/deleteFavourite', userController.deleteFavourite);
router.post('/fetchUserDetails', userController.fetchUserDetails);



module.exports = router;

