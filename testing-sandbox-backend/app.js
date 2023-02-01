const express = require("express");
const app = express();
const userRoutes = require("./routes");
app.use("/", userRoutes);
app.use(express.json());

app.use(function (req, res, next) {
return next(new Error("No can find"));
});

app.use(function (err, req, res, next) {
const status = err.status || 500;
const message = err.message;

return res.status(status).json({
    error: { message, status },
});
});



module.exports = app;