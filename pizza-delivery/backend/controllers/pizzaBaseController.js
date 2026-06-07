const PizzaBase = require("../models/PizzaBase");

const getAllBases = async (req, res) => {
    try {
        const bases = await PizzaBase.find();

        res.status(200).json(bases);
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const createBase = async (req, res) => {
    try {
        const { name, price, stock } = req.body;

        const existingBase = await PizzaBase.findOne({ name });

        if (existingBase) {
            return res.status(400).json({
                message: "Base already exists"
            });
        }

        const base = await PizzaBase.create({
            name,
            price,
            stock
        });

        res.status(201).json(base);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const updateBase = async (req, res) => {
    try {
        const updatedBase = await PizzaBase.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true
            }
        );

        if (!updatedBase) {
            return res.status(404).json({
                message: "Base not found"
            });
        }

        res.json(updatedBase);

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

const deleteBase = async (req, res) => {
    try {
        const base = await PizzaBase.findById(req.params.id);

        if (!base) {
            return res.status(404).json({
                message: "Base not found"
            });
        }

        await base.deleteOne();

        res.json({
            message: "Base deleted"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    getAllBases,
    createBase,
    updateBase,
    deleteBase
};
