const express = require("express");

const router = express.Router();

const {
    getAllToppings,
    createTopping,
    updateTopping,
    deleteTopping
} = require("../controllers/toppingController");

const authMiddleware =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");

router.get("/", getAllToppings);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createTopping
);

router.patch(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateTopping
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteTopping
);

module.exports = router;
