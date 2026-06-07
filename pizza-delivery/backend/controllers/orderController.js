const Order = require("../models/Order");
const PizzaBase = require("../models/PizzaBase");
const Sauce = require("../models/Sauce");
const Cheese = require("../models/Cheese");
const Topping = require("../models/Topping");

const placeOrder = async (req, res) => {
    try {

        const {
            base,
            sauce,
            cheese,
            toppings
        } = req.body;

        const selectedBase =
            await PizzaBase.findById(base);

        const selectedSauce =
            await Sauce.findById(sauce);

        const selectedCheese =
            await Cheese.findById(cheese);

        const selectedToppings =
            await Topping.find({
                _id: { $in: toppings }
            });

        if (
            !selectedBase ||
            !selectedSauce ||
            !selectedCheese
        ) {
            return res.status(400).json({
                message: "Invalid pizza configuration"
            });
        }

        if (selectedBase.stock <= 0) {
            return res.status(400).json({
                message: "Base out of stock"
            });
        }

        if (selectedSauce.stock <= 0) {
            return res.status(400).json({
                message: "Sauce out of stock"
            });
        }

        if (selectedCheese.stock <= 0) {
            return res.status(400).json({
                message: "Cheese out of stock"
            });
        }

        for (const topping of selectedToppings) {
            if (topping.stock <= 0) {
                return res.status(400).json({
                    message: `${topping.name} out of stock`
                });
            }
        }

        let totalPrice = 0;

        totalPrice += selectedBase.price;
        totalPrice += selectedSauce.price;
        totalPrice += selectedCheese.price;

        selectedToppings.forEach((topping) => {
            totalPrice += topping.price;
        });

        selectedBase.stock--;
        selectedSauce.stock--;
        selectedCheese.stock--;

        for (const topping of selectedToppings) {
            topping.stock--;
        }

        await selectedBase.save();
        await selectedSauce.save();
        await selectedCheese.save();

        for (const topping of selectedToppings) {
            await topping.save();
        }

        const order = await Order.create({
            user: req.user._id,
            base,
            sauce,
            cheese,
            toppings,
            totalPrice
        });

        res.status(201).json(order);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const getMyOrders = async (req, res) => {
    try {

        const orders = await Order.find({
            user: req.user._id
        })
            .populate("base")
            .populate("sauce")
            .populate("cheese")
            .populate("toppings");

        res.json(orders);

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });
    }
};


const getAllOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .populate("user", "name email")
            .populate("base")
            .populate("sauce")
            .populate("cheese")
            .populate("toppings");

        res.status(200).json(orders);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


const updateOrderStatus = async (req, res) => {
    try {

        const { status } = req.body;

        const order = await Order.findById(
            req.params.id
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.orderStatus = status;

        await order.save();

        res.json({
            message: "Order updated",
            order
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const markOrderPaid = async (req, res) => {
    try {

        const order = await Order.findById(
            req.params.id
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.paymentStatus = "paid";

        await order.save();

        res.json({
            message: "Payment recorded",
            order
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    markOrderPaid
};
