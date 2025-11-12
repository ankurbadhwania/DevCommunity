const express = require('express');
const {validateSignUp} = require("../utils/validation")
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try{
        validateSignUp(req);
        const {firstName, lastName, email, password} = req.body;        
        const passwordHash = await bcrypt.hash(password, 10);
        // const user = new User(req.body);
        const user = new User({
            firstName,
            lastName,
            email,
            password : passwordHash,
        });

        await user.save();
        res.send("new user added");
    }
    catch(err){
        res.status(400).send("error user not saved: " + err.message);
    }
    
})

//login route
authRouter.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            res.status(400).send("invalid credentials");
        }
        // const isPasswordValid = await bcrypt.compare(password, user.password);
        const isPasswordValid = await user.ValidatePassword(password);

        if(isPasswordValid){
            // const token = await jwt.sign({ _id : user._id}, "DevCommunity$123", {expiresIn : "1d"});
            const token = await user.getJWT();
            res.cookie("token", token, {expires : new Date(Date.now() + 8 * 3600000)});
            res.send(user);
        }
        else{
            res.status(400).send("invalid credentials");
        }
    }
    catch(err){
        res.status(400).send("Error: " + err.message)
    }

})

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {expires : new Date(Date.now())});
    res.send("logout successfull");
})

module.exports = authRouter;