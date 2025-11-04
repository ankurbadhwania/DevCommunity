const express = require('express')
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth")
const {validateEditProfileData} = require("../utils/validation")
// login profile
profileRouter.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    }  
    catch(err){
        res.send("invalid request: " + err.message);
    }
})

profileRouter.patch("/profile/edit", userAuth, async (req, res) =>{
    const loggedInUser = req.user;
    try {
        if(!validateEditProfileData(req)){
            throw new Error("enter valid update");
        }
        Object.keys(req.body).forEach((key) => loggedInUser[key] = req.body[key]);
        await loggedInUser.save();
        res.json({
            message : `${loggedInUser.firstName}, your profile updated successfully`,
            data : loggedInUser
        })
    }
    catch(err){
        res.status(400).send(err.message);
    }
})

module.exports = profileRouter;