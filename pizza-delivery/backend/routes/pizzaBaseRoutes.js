const express = require("express");

const router = express.Router();

const {
    getAllBases,
    createBase,
    updateBase,
    deleteBase
} = require("../controllers/pizzaBaseController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

router.get("/", getAllBases);

router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    createBase
);

router.patch(
    "/:id",
    authMiddleware,
    adminMiddleware,
    updateBase
);

router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    deleteBase
);

module.exports = router;
