const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes");


app.use(cors());
app.use(express.json());
app.use("/", userRoutes);

app.use(function (req, res, next) {
return next(new Error("Not found"));
});

app.use(function (err, req, res, next) {
const status = err.status || 500;
const message = err.message;

return res.status(status).json({
    error: { message, status },
});
});



module.exports = app;