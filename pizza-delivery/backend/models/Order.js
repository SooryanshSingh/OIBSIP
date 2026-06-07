const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        base: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "PizzaBase",
            required: true
        },

        sauce: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Sauce",
            required: true
        },

        cheese: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cheese",
            required: true
        },

        toppings: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Topping"
            }
        ],

        totalPrice: {
            type: Number,
            required: true
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid"],
            default: "pending"
        },

        orderStatus: {
            type: String,
            enum: [
                "received",
                "in_kitchen",
                "out_for_delivery",
                "delivered"
            ],
            default: "received"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Order",
    orderSchema
);
