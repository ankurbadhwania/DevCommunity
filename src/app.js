const express = require("express")
const connectDB = require("./config/database");
const User = require("./models/user")
const app = express();   // creating application


app.post("/signup", async (req, res) => {
    const user =  new User({
        firstName  : "ankur",
        lastName : "yadav",
        email : "abc@gmail.com",
        password : "127a3"
    })
    // const user = new User(userObj);
    try{
        await user.save();
    res.send("new user added");
    }
    catch(err){
        res.status(400).send("error user not saved: " + err.message);
    }
    
})

connectDB().then(()=> {
    const port = 3000;
    console.log("database connected");
    app.listen(port, ()=>{
        console.log(`server started, listening to port ${port}`)
    })
}).catch((err) =>{
    console.error("database connection error")
})
 