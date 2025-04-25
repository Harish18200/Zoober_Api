const express = require('express');
const router = express.Router();


const userController = require('../controllers/Users/userController');
const rideController = require('../controllers/Ride/rideController');
const verifyToken = require('../Middleware/authMiddleware');

router.post('/userLogin', userController.userLogin);  // Done
router.post('/userSignUp', userController.userSignUp);  // Done
router.post('/rideSignUp', rideController.rideSignUp);
router.post('/rideLogin', rideController.rideLogin);
router.post('/addVehicle', rideController.addVehicle);
router.post('/rideVehicleList', rideController.rideVehicleList);
router.post('/addDocument', rideController.addDocument);
router.post('/addOrderDetail', rideController.addOrderDetail);
router.post('/getOrderDetailByRideId', rideController.getOrderDetailByRideId);
router.post('/getOrderDetailByRideStatus', rideController.getOrderDetailByRideStatus);
router.post('/updateOrderDetailByRide', rideController.updateOrderDetailByRide);
router.post('/getOrderDetailById', rideController.getOrderDetailById);


router.post('/deviceLocation', verifyToken, userController.deviceLocation);  // Done
router.post('/storeOrderDetails', verifyToken, userController.storeOrderDetails);  // Done
router.get('/pickupTypes', verifyToken, userController.pickupTypes); // Done
router.get('/UserRideTypes', verifyToken, userController.UserRideTypes);   // Done
router.get('/suggestions', verifyToken, userController.suggestions);  // Done
 
router.post('/userProfileUpdate', verifyToken, userController.userProfileUpdate);
router.post('/deleteAccount', verifyToken, userController.deleteAccount);
router.post('/logout', verifyToken, userController.logout);
router.post('/favouriteList', verifyToken, userController.favouriteList);
router.post('/addFavourite', verifyToken, userController.addFavourite);
router.post('/editFavourite', verifyToken, userController.editFavourite);
router.post('/deleteFavourite', verifyToken, userController.deleteFavourite);
router.post('/fetchUserDetails', verifyToken, userController.fetchUserDetails);

module.exports = router;

