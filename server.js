require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const session = require('express-session');
const db = mongoose.connection;
const PORT = process.env.PORT || 4000;
const authRoutes = require("./routes/routes");

mongoose.connect('mongodb://127.0.0.1:27017/Sculptify', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to the DataBase"));

app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.use(session({
    secret: 'my secret key',
    saveUninitialized: true,
    resave: false
}));

app.use('/auth', authRoutes)
app.use('/upload', express.static('static'))
app.use((req, res, next) => {
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

