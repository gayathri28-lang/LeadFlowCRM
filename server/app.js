const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
const authRoutes = require("./routes/authRoutes");

const leadRoutes = require("./routes/leadRoutes");

dotenv.config();

const app = express();

app.use(cors());

app.use(morgan("dev"));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "LeadFlow CRM API is running"
    });
});

module.exports = app;