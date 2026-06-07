const Cheese = require("../models/Cheese");

const getAllCheeses = async (req, res) => {
    try {
        const cheeses = await Cheese.find();

        res.status(200).json(cheeses);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const createCheese = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        const existingCheese =
            await Cheese.findOne({ name });

        if (existingCheese) {
            return res.status(400).json({
                message: "Cheese already exists"
            });
        }

        const cheese = await Cheese.create({
            name,
            price,
            stock
        });

        res.status(201).json(cheese);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const updateCheese = async (req, res) => {
    try {
        const updatedCheese =
            await Cheese.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

        if (!updatedCheese) {
            return res.status(404).json({
                message: "Cheese not found"
            });
        }

        res.json(updatedCheese);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const deleteCheese = async (req, res) => {
    try {
        const cheese =
            await Cheese.findById(req.params.id);

        if (!cheese) {
            return res.status(404).json({
                message: "Cheese not found"
            });
        }

        await cheese.deleteOne();

        res.json({
            message: "Cheese deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getAllCheeses,
    createCheese,
    updateCheese,
    deleteCheese
};
