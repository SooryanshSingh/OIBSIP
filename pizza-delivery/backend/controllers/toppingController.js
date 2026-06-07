const Topping = require("../models/Topping");

const getAllToppings = async (req, res) => {
    try {
        const toppings = await Topping.find();

        res.status(200).json(toppings);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const createTopping = async (req, res) => {
    try {
        const { name, category, price, stock } = req.body;

        const existingTopping =
            await Topping.findOne({ name });

        if (existingTopping) {
            return res.status(400).json({
                message: "Topping already exists"
            });
        }

        const topping = await Topping.create({
            name,
            category,
            price,
            stock
        });

        res.status(201).json(topping);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const updateTopping = async (req, res) => {
    try {
        const updatedTopping =
            await Topping.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

        if (!updatedTopping) {
            return res.status(404).json({
                message: "Topping not found"
            });
        }

        res.json(updatedTopping);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const deleteTopping = async (req, res) => {
    try {
        const topping =
            await Topping.findById(req.params.id);

        if (!topping) {
            return res.status(404).json({
                message: "Topping not found"
            });
        }

        await topping.deleteOne();

        res.json({
            message: "Topping deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getAllToppings,
    createTopping,
    updateTopping,
    deleteTopping
};
