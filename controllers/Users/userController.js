const user = require('../../models/User');
const UserLocation = require('../../models/UserLocation');
const OrderDetail = require('../../models/OrderDetail');
const Suggestion = require('../../models/Suggestion');
const UserRideType = require('../../models/UserRideType');
const PickupType = require('../../models/PickupType');
const bcrypt = require('bcrypt');
const moment = require('moment');
const Favourite = require('../../models/Favourite');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');


const JWT_SECRET = process.env.JWT_SECRET || 'ZooberUser';

exports.userSignUp = async (req, res) => {
    const { mobile, email, password, firstname, lastname, gender, dob } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }
    const mobileRegex = /^\d{10}$/;
    if (!mobile || !mobileRegex.test(mobile)) {
        return res.status(400).json({ success: false, message: 'Mobile number must be 10 digits.' });
    }
    if (!password || password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }
    if (!firstname || firstname.trim() === '') {
        return res.status(400).json({ success: false, message: 'First name is required.' });
    }

    try {
        const existingEmail = await user.findOne({ where: { email } });
        if (existingEmail) {
            return res.status(409).json({ success: false, message: 'Email already in use.' });
        }

        const existingMobile = await user.findOne({ where: { mobile } });
        if (existingMobile) {
            return res.status(409).json({ success: false, message: 'Mobile number already in use.' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await user.create({
            mobile,
            email,
            password: hashedPassword,
            firstname,
            lastname,
            gender,
            dob
        });

        return res.status(201).json({
            success: true,
            message: 'User record created successfully.',
            data: newUser
        });

    } catch (error) {
        console.error('Signup Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message
        });
    }
};
exports.userProfileUpdate = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'userId is required to update the user profile.',
        });
    }
    const updateData = {};
    const fields = ['mobile', 'email', 'firstname', 'lastname', 'gender', 'dob', 'profile'];

    fields.forEach(field => {
        if (req.body[field] !== undefined && req.body[field] !== null) {
            updateData[field] = req.body[field];
        }
    });

    try {

        const result = await user.update(updateData, {
            where: { id: userId },
        });

        res.status(200).json({
            success: true,
            message: 'User record updated successfully.',
            
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.fetchUserDetails = async (req, res) => {
    const { userId } = req.body;

    try {
        const foundUser = await user.findOne({ userId });

        if (!foundUser) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        return res.status(200).json({ success: true, user: foundUser });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
exports.userLogin = async (req, res) => {
    const { mobile, password } = req.body;

    const mobileRegex = /^\d{10}$/;
    if (!mobile || !mobileRegex.test(mobile)) {
        return res.status(400).json({ success: false, message: 'Mobile number must be 10 digits.' });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
    }

    try {
        const existingUser = await user.findOne({ where: { mobile } });

        if (!existingUser) {
            return res.status(401).json({ success: false, message: 'Invalid mobile number or password.' });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid mobile number or password.' });
        }

        const token = jwt.sign(
            { id: existingUser.id, mobile: existingUser.mobile },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: existingUser.id,
                mobile: existingUser.mobile,
                firstName: existingUser.firstname
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};
exports.deviceLocation = async (req, res) => {
    const { user_id, device_location } = req.body;

    if (!user_id) {
        return res.status(400).json({
            success: false,
            message: 'userId is required.',
        });
    }
    if (!device_location) {
        return res.status(400).json({
            success: false,
            message: 'deviceLocation is required.',
        });
    }

    try {
        const newLocation = await UserLocation.create({
            user_id,
            device_location
        });

        return res.status(201).json({
            success: true,
            message: 'Device location saved successfully.',
            data: newLocation
        });

    } catch (error) {
        console.error('Location Save Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message
        });
    }
};

exports.deleteAccount = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'userId Required.',
        });
    }

    try {
        const user = await user.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        await user.update(
            {
                deleted_flag: 1,
                deleted_at: new Date(),
            },
            {
                where: { id: userId },
            }
        );

        return res.status(200).json({
            success: true,
            message: 'User account marked as deleted.',
        });

    } catch (error) {
        console.error('Delete Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};
exports.logout = async (req, res) => {
    const { userId } = req.body;


};

exports.deleteAccount = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'userId Required.',
        });
    }

    try {
        const user = await user.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        await user.update(
            {
                deleted_flag: 1,
                deleted_at: new Date(),
            },
            {
                where: { id: userId },
            }
        );

        return res.status(200).json({
            success: true,
            message: 'User account marked as deleted.',
        });

    } catch (error) {
        console.error('Delete Error:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};

exports.logout = async (req, res) => {
    const { userId } = req.body;


};

exports.favouriteList = async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'userId Required.',
        });
    }
    try {
        const favourites = await Favourite.findAll({
            where: { user_id: userId }
        });

        return res.status(200).json({
            success: true,
            message: 'Favourites retrieved successfully.',
            data: favourites,
        });
    } catch (error) {
        console.error('Error fetching favourites:', error);
        return res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
};

exports.addFavourite = async (req, res) => {
    const { userId, title, description } = req.body;

    if (!userId) {
        return res.status(400).json({
            success: false,
            message: 'userId is required.',
        });
    }

    try {
        const favourite = await Favourite.create({
            user_id: userId,
            title,
            description
        });

        return res.status(200).json({
            success: true,
            message: 'Favourite added successfully.',
            data: favourite,
        });
    } catch (error) {
        console.error('Error adding favourite:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};

exports.editFavourite = async (req, res) => {
    const { userId, title, description, id } = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Favourite Id is required.',
        });
    }

    try {
        const [updatedRows] = await Favourite.update(
            {
                title,
                description,
                user_id: userId,
            },
            {
                where: { id: id }
            }
        );

        if (updatedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'No favourite found with this ID to update.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Favourite updated successfully.',
        });
    } catch (error) {
        console.error('Error updating favourite:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};

exports.deleteFavourite = async (req, res) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'Favourite Id is required.',
        });
    }

    try {
        const [updatedRows] = await Favourite.update(
            {
                deleted_at: new Date(),
            },
            {
                where: { id: id }
            }
        );

        if (updatedRows === 0) {
            return res.status(404).json({
                success: false,
                message: 'No favourite found with this ID to delete.',
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Favourite deleted successfully (soft delete).',
        });
    } catch (error) {
        console.error('Error deleting favourite:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error.',
        });
    }
};

exports.storeOrderDetails = async (req, res) => {
    const {
        user_id,
        pickup_type_id,
        user_ride_type_id,
        amount,
        kilometer,
        pickup_start_datetime,
        pickup_location,
        drop_location,
        suggestion_id
    } = req.body;
    const requiredFields = {
        user_id,
        pickup_type_id,
        user_ride_type_id,
        pickup_start_datetime,
        pickup_location,
        drop_location,
        suggestion_id
    };

    for (const [field, value] of Object.entries(requiredFields)) {
        if (!value) {
            return res.status(400).json({
                success: false,
                message: `${field} is required.`
            });
        }
    }

    try {
        const newOrder = await OrderDetail.create({
            user_id,
            pickup_type_id,
            user_ride_type_id,
            amount,
            kilometer,
            pickup_start_datetime,
            pickup_location,
            drop_location,
            suggestion_id
        });

        return res.status(201).json({
            success: true,
            message: 'Order details stored successfully.',
            data: newOrder
        });
    } catch (error) {
        console.error('Error storing order details:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message
        });
    }
};

exports.pickupTypes = async (req,res) => {
    try {
        const pickupTypes = await PickupType.findAll({
            where: {
                deleted_flag: {
                    [Op.is]: null
                }
            }
        });

        return res.status(200).json({
            success: true,
            message: 'Pickup types fetched successfully.',
            data: pickupTypes
        });
    } catch (error) {
        console.error('Error fetching pickup types:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message
        });
    }
};


exports.UserRideTypes = async (req,res) => {
    try {
        const UserRideTypes = await UserRideType.findAll({
            where: {
                deleted_flag: {
                    [Op.is]: null
                }
            }
        });

        return res.status(200).json({
            success: true,
            message: 'User Ride types fetched successfully.',
            data: UserRideTypes
        });
    } catch (error) {
        console.error('Error fetching pickup types:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message
        });
    }
};

exports.suggestions = async (req,res) => {
    try {
        const suggestions = await Suggestion.findAll({
            where: {
                deleted_flag: {
                    [Op.is]: null
                }
            }
        });
        return res.status(200).json({
            success: true,
            message: 'Suggestion fetched successfully.',
            data: suggestions
        });
    } catch (error) {
        console.error('Error fetching pickup types:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Please try again later.',
            error: error.message
        });
    }
};