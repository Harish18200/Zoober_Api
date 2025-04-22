const Login = require('../../models/User');
const bcrypt = require('bcrypt');
const moment = require('moment');
const Favourite = require('../../models/Favourite');
const jwt = require('jsonwebtoken');


const JWT_SECRET = process.env.JWT_SECRET || 'ZooberUser';

exports.userSignUp = async (req, res) => {
    const { mobile, email, password, name } = req.body;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }
    const mobileRegex = /^\d{10}$/;
    if (!mobile || !mobileRegex.test(mobile)) {
        return res.status(400).json({ success: false, message: 'Mobile number must be 10 digits.' });
    }
    if (!password || password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password is required and must be at least 6 characters.' });
    }
    if (!name || name.trim() === '') {
        return res.status(400).json({ success: false, message: 'Name is required.' });
    }
    try {

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await Login.create({
            mobile,
            email,
            password: hashedPassword,
            firstname: name

        });

        res.status(200).json({
            success: true,
            message: 'User  Record Created Successfully.',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
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

        const result = await Login.update(updateData, {
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
        const user = await Login.findOne({ userId });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found.' });
        }

        return res.status(200).json({ success: true, user });
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
        return res.status(400).json({ success: false, message: 'Password is required and must be at least 6 characters.' });
    }

    try {
        const user = await Login.findOne({ mobile });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid mobile number or password.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid mobile number or password.' });
        }

        const token = jwt.sign(
            { id: user._id, mobile: user.mobile },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token: `Bearer ${token}`,
            user: {
                id: user._id,
                mobile: user.mobile,
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
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
        const user = await Login.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        await Login.update(
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
        const user = await Login.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.',
            });
        }

        await Login.update(
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
