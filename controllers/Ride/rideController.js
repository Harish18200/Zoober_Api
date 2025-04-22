const Ride = require('../../models/Ride');
const Vehicle = require('../../models/Vehicle');
const Document = require('../../models/Document');
const OrderDetail = require('../../models/OrderDetail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');


const JWT_SECRET = process.env.JWT_SECRET || 'ZooberRide';
exports.rideSignUp = async (req, res) => {
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
        const user = await Ride.create({
            mobile,
            email,
            password: hashedPassword,
            firstname: name

        });

        res.status(200).json({
            success: true,
            message: 'Ride  Record Created Successfully.',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.rideLogin = async (req, res) => {
    const { mobile, password } = req.body;
    const mobileRegex = /^\d{10}$/;

    if (!mobile || !mobileRegex.test(mobile)) {
        return res.status(400).json({ success: false, message: 'Mobile number must be 10 digits.' });
    }
    if (!password || password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password is required and must be at least 6 characters.' });
    }
    try {
        const user = await Ride.findOne({ mobile });
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

exports.addVehicle = async (req, res) => {
    const { ride_id, brand, model, model_year, license_plate, color, booking_type } = req.body;
    if (!ride_id || !brand || !model || !model_year || !license_plate || !booking_type) {
        return res.status(400).json({
            success: false,
            message: 'rideId, brand, model, model_year, license_plate, and booking_type are required.'
        });
    }
    try {
        const newVehicle = new Vehicle({
            ride_id,
            brand,
            model,
            model_year,
            license_plate,
            color,
            booking_type
        });

        const savedVehicle = await newVehicle.save();

        return res.status(201).json({
            success: true,
            message: 'Vehicle added successfully',
            data: savedVehicle
        });

    } catch (error) {
        console.error('Error adding vehicle:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while adding vehicle'
        });
    }
};
exports.rideVehicleList = async (req, res) => {
    const { ride_id } = req.body;

    if (!ride_id) {
        return res.status(400).json({
            success: false,
            message: 'ride_id is required.'
        });
    }

    try {
        const vehicleList = await Vehicle.findAll({
            where: { ride_id: ride_id }
        });

        return res.status(200).json({
            success: true,
            message: 'Vehicle list retrieved successfully',
            data: vehicleList
        });

    } catch (error) {
        console.error('Error fetching vehicle list:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching vehicle list'
        });
    }
};

exports.addDocument = async (req, res) => {
    const { ride_id, photo, card_number, expired_date, name } = req.body;
    if (!ride_id || !card_number) {
        return res.status(400).json({
            success: false,
            message: 'ride_id, card_number,  are required.'
        });
    }
    try {
        const newDocument = new Document({
            ride_id,
            photo,
            card_number,
            expired_date,
            name
        });
        const savedDocument = await newDocument.save();
        return res.status(201).json({
            success: true,
            message: 'Document added successfully',
            data: savedDocument
        });

    } catch (error) {
        console.error('Error adding document:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while adding document'
        });
    }
};

exports.addOrderDetail = async (req, res) => {
    const {
        ride_id,
        order_name,
        cash_type,
        amount,
        kilometer,
        pickup,
        dropoff,
        note,
        tripfare,
        status
    } = req.body;
    if (!ride_id) {
        return res.status(400).json({
            success: false,
            message: 'ride_id is required.'
        });
    }
    try {
        const newOrderDetail = new OrderDetail({
            ride_id,
            order_name,
            cash_type,
            amount,
            kilometer,
            pickup,
            dropoff,
            note,
            tripfare,
            status
        });
        const savedOrderDetail = await newOrderDetail.save();
        return res.status(201).json({
            success: true,
            message: 'Order detail added successfully',
            data: savedOrderDetail
        });
    } catch (error) {
        console.error('Error adding order detail:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while adding order detail'
        });
    }
};
exports.getOrderDetailByRideId = async (req, res) => {
    const { ride_id } = req.body;
    if (!ride_id) {
        return res.status(400).json({
            success: false,
            message: 'ride_id is required.'
        });
    }
    try {
        const orderDetails = await OrderDetail.findAll({
            where: { ride_id }
        });
        return res.status(200).json({
            success: true,
            message: 'Order details retrieved successfully',
            data: orderDetails
        });
    } catch (error) {
        console.error('Error fetching order details:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching order details'
        });
    }
};

exports.getOrderDetailByRideStatus = async (req, res) => {
    const { ride_id } = req.body;
    if (!ride_id) {
        return res.status(400).json({
            success: false,
            message: 'ride_id is required.'
        });
    }
    try {
        const orderDetails = await OrderDetail.findAll({
            where: {
                ride_id,
                status: { [Op.is]: null }
            }
        });
        return res.status(200).json({
            success: true,
            message: 'Order details retrieved successfully',
            data: orderDetails
        });

    } catch (error) {
        console.error('Error fetching order details:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching order details'
        });
    }
};
exports.updateOrderDetailByRide = async (req, res) => {
    const { ride_id, id } = req.body;
    if (!ride_id || !id) {
        return res.status(400).json({
            success: false,
            message: 'ride_id and id are required.'
        });
    }
    try {
        const [updatedCount] = await OrderDetail.update(
            { status: 1 },
            {
                where: {
                    ride_id: ride_id,
                    id: id
                }
            }
        );
        if (updatedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'No matching order found to update.'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Order detail updated successfully',
            updated: updatedCount
        });
    } catch (error) {
        console.error('Error updating order detail:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while updating order detail'
        });
    }
};

exports.getOrderDetailById = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.status(400).json({
            success: false,
            message: 'id is required.'
        });
    }
    try {
        const orderDetail = await OrderDetail.findOne({
            where: { id }
        });
        if (!orderDetail) {
            return res.status(404).json({
                success: false,
                message: 'Order detail not found.'
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Order detail retrieved successfully',
            data: orderDetail
        });

    } catch (error) {
        console.error('Error fetching order detail:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error while fetching order detail'
        });
    }
};
