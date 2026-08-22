const express = require("express");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// Allows us to receive JSON data
app.use(express.json());

// Bonus: simple middleware to show requests
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// Home route
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

// POST user
app.post("/user", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    res.json({
        message: `Hello, ${name}!`
    });
});

// GET user by ID
app.get("/user/:id", (req, res) => {
    const id = req.params.id;

    res.json({
        message: `User ${id} profile`
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});