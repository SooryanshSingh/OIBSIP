const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB(); // <-- THIS is the wiring

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Pizza Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const authRoutes =
require("./routes/authRoutes");

app.use("/api/auth",authRoutes);

const authMiddleware = require("./middleware/authMiddleware");

app.get("/api/profile", authMiddleware, (req, res) => {
    res.json(req.user);
});

const adminMiddleware = require("./middleware/adminMiddleware");

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
const pizzaBaseRoutes =
    require("./routes/pizzaBaseRoutes");


app.use("/api/bases", pizzaBaseRoutes);


const sauceRoutes =
    require("./routes/sauceRoutes");



app.use("/api/sauces", sauceRoutes);

const cheeseRoutes =
    require("./routes/cheeseRoutes");



app.use("/api/cheeses", cheeseRoutes);

const toppingRoutes =
    require("./routes/toppingRoutes");
app.use("/api/toppings", toppingRoutes);

const orderRoutes =
    require("./routes/orderRoutes");

Add:

app.use("/api/orders", orderRoutes);
