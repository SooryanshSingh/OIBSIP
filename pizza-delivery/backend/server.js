const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");

const pizzaBaseRoutes = require("./routes/pizzaBaseRoutes");
const sauceRoutes = require("./routes/sauceRoutes");
const cheeseRoutes = require("./routes/cheeseRoutes");
const toppingRoutes = require("./routes/toppingRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes =
    require("./routes/paymentRoutes");



app.use(
    "/api/payments",
    paymentRoutes
);
app.get("/", (req, res) => {
    res.send("Pizza Backend Running");
});

app.use("/api/auth", authRoutes);

app.get(
    "/api/profile",
    authMiddleware,
    (req, res) => {
        res.json(req.user);
    }
);

app.get(
    "/api/admin",
    authMiddleware,
    adminMiddleware,
    (req, res) => {
        res.json({
            message: "Welcome Admin"
        });
    }
);

app.use("/api/bases", pizzaBaseRoutes);
app.use("/api/sauces", sauceRoutes);
app.use("/api/cheeses", cheeseRoutes);
app.use("/api/toppings", toppingRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
