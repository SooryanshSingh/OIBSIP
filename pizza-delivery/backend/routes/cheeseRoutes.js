const express = require("express");

const router = express.Router();

const {
    getAllCheeses,
    createCheese,
    updateCheese,
    deleteCheese
} = require("../controllers/cheeseController");

const authMiddleware =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");

router.get("/", getAllCheeses);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createCheese
);

router.patch(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateCheese
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteCheese
);

module.exports = router;
