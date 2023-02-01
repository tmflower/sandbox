const express = require("express");
const User = require("./user");
const router = new express.Router();

router.get("/home", async function (req, res) {
    const msg = "Welcome home!";
    return res.status(200).json({msg})
});

router.post("/register", async function (req, res) { 
    try {
        const newUser = await User.signup(req.body);        
        return res.status(201).json({ newUser });
    }
    catch(err) {
        return (err)
    }

});

module.exports = router;