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
