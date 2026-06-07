const express = require("express");

const router = express.Router();

const {
    getAllSauces,
    createSauce,
    updateSauce,
    deleteSauce
} = require("../controllers/sauceController");

const authMiddleware =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");

router.get("/", getAllSauces);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createSauce
);

router.patch(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateSauce
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteSauce
);

module.exports = router;
