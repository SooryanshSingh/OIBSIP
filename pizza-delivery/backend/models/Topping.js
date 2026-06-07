const mongoose = require("mongoose");

const toppingSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },

        category: {
            type: String,
            required: true,
            enum: ["veggie", "meat"]
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        stock: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Topping",
    toppingSchema
);
