const mongoose = require("mongoose");
const connectionRequestSchema = new mongoose.Schema({
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type : String,
        enum :{
            values : ["ignored", "accepted", "interested", "rejected"],
            message : "invalid status type"
        }
    }
}, {timestamps : true})

connectionRequestSchema.index({fromUserId : 1, toUserId : 1}) //compound index ascending order
const ConnectionRequest = mongoose.model("connectionRequest", connectionRequestSchema)
module.exports = ConnectionRequest;