const Sauce = require("../models/Sauce");

const getAllSauces = async (req, res) => {
    try {
        const sauces = await Sauce.find();
        res.status(200).json(sauces);
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const createSauce = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        const existingSauce =
            await Sauce.findOne({ name });

        if (existingSauce) {
            return res.status(400).json({
                message: "Sauce already exists"
            });
        }

        const sauce = await Sauce.create({
            name,
            price,
            stock
        });

        res.status(201).json(sauce);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const updateSauce = async (req, res) => {
    try {
        const updatedSauce =
            await Sauce.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

        if (!updatedSauce) {
            return res.status(404).json({
                message: "Sauce not found"
            });
        }

        res.json(updatedSauce);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const deleteSauce = async (req, res) => {
    try {
        const sauce =
            await Sauce.findById(req.params.id);

        if (!sauce) {
            return res.status(404).json({
                message: "Sauce not found"
            });
        }

        await sauce.deleteOne();

        res.json({
            message: "Sauce deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getAllSauces,
    createSauce,
    updateSauce,
    deleteSauce
};
