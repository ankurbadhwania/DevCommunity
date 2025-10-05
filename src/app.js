const express = require("express")
const app = express();   // creating application

app.use("/test",(req, res) => {
    res.send("hello test")
})
app.use((req, res) => {
    res.send("hello from the server")
})
app.listen(3000, ()=>{
    console.log("server started")
})
 