const express = require('express')
const userAuth = require("../middlewares/auth")
const requestRouter = express.Router();

//connection request
requestRouter.post("/sendConnectionRequest", userAuth, (req, res) => {
    const user = req.user;
    res.send(user.firstName + " sent connection request");
})
module.exports = requestRouter;
