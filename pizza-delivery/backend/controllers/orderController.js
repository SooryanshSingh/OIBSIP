const Order = require("../models/Order");
const PizzaBase = require("../models/PizzaBase");
const Sauce = require("../models/Sauce");
const Cheese = require("../models/Cheese");
const Topping = require("../models/Topping");
const nodemailer = require("nodemailer");

const sendAlert = async (type, name, qty) => {
    try {
        if (!process.env.ADMIN_EMAIL) {
            console.log("ADMIN_EMAIL not set");
            return;
        }

        const mailer = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await mailer.sendMail({
            from: process.env.EMAIL_USER,
            to: process.env.ADMIN_EMAIL,
            subject: "Low Stock Alert",
            html: `
                <h2>Low Stock Alert</h2>
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Stock:</strong> ${qty}</p>
                <p>Please restock this item soon.</p>
            `
        });

        console.log("Low stock mail sent:", name);

    } catch (err) {
        console.log("Low stock mail error:", err);
    }
};

const checkStock = async (b, s, c, tops) => {
    if (b.stock === 19) {
        await sendAlert(
            "Base",
            b.name,
            b.stock
        );
    }

    if (s.stock === 19) {
        await sendAlert(
            "Sauce",
            s.name,
            s.stock
        );
    }

    if (c.stock === 19) {
        await sendAlert(
            "Cheese",
            c.name,
            c.stock
        );
    }

    for (const t of tops) {
        if (t.stock === 19) {
            await sendAlert(
                "Topping",
                t.name,
                t.stock
            );
        }
    }
};

const placeOrder = async (req, res) => {
    try {
        const {
            base,
            sauce,
            cheese,
            toppings
        } = req.body;

        const b = await PizzaBase.findById(base);
        const s = await Sauce.findById(sauce);
        const c = await Cheese.findById(cheese);

        const tops = await Topping.find({
            _id: { $in: toppings }
        });

        if (!b || !s || !c) {
            return res.status(400).json({
                message: "Invalid pizza configuration"
            });
        }

        if (b.stock <= 0) {
            return res.status(400).json({
                message: "Base out of stock"
            });
        }

        if (s.stock <= 0) {
            return res.status(400).json({
                message: "Sauce out of stock"
            });
        }

        if (c.stock <= 0) {
            return res.status(400).json({
                message: "Cheese out of stock"
            });
        }

        for (const t of tops) {
            if (t.stock <= 0) {
                return res.status(400).json({
                    message: `${t.name} out of stock`
                });
            }
        }

        let totalPrice = 0;

        totalPrice += b.price;
        totalPrice += s.price;
        totalPrice += c.price;

        tops.forEach((t) => {
            totalPrice += t.price;
        });

        b.stock--;
        s.stock--;
        c.stock--;

        for (const t of tops) {
            t.stock--;
        }

        await b.save();
        await s.save();
        await c.save();

        for (const t of tops) {
            await t.save();
        }

        await checkStock(
            b,
            s,
            c,
            tops
        );

        const order = await Order.create({
            user: req.user._id,
            base,
            sauce,
            cheese,
            toppings,
            totalPrice
        });

        res.status(201).json(order);

    } catch (err) {
        console.log(err);

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

    } catch (err) {
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

    } catch (err) {
        console.log(err);

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

    } catch (err) {
        console.log(err);

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

    } catch (err) {
        console.log(err);

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
