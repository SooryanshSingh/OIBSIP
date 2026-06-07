const express = require("express");

const router = express.Router();

const {
    placeOrder,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
    markOrderPaid
} = require("../controllers/orderController");

const authMiddleware =
    require("../middleware/authMiddleware");

const adminMiddleware =
    require("../middleware/adminMiddleware");

router.post(
    "/",
    authMiddleware,
    placeOrder
);

router.get(
    "/my-orders",
    authMiddleware,
    getMyOrders
);

router.get(
    "/",
    authMiddleware,
    adminMiddleware,
    getAllOrders
);

router.patch(
    "/:id/status",
    authMiddleware,
    adminMiddleware,
    updateOrderStatus
);

router.patch(
    "/:id/pay",
    authMiddleware,
    adminMiddleware,
    markOrderPaid
);

module.exports = router;
