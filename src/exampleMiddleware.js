import express from 'express';

const app = express();
app.use(express.json()); // Middleware to process JSON

// authentication middleware
function authMiddleware(req, res, next) {
    const token = req.headers['authorization']; // Search for the token in the headers
    if (token === 'mysecrettoken') {
        next(); // If the token is valid, proceed to the following function
    } else {
        res.status(401).send({ msg: "Unauthorized" }); // If not, reply with error
    }
}

// Protected route
app.get('/api/secure-data', authMiddleware, (req, res) => {
    res.send({ secretData: "This is protected information" });
});

// public routea
app.get('/', (req, res) => {
    res.send({ msg: "Welcome to the public route!" });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
