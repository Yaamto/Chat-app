const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    username : {
        type:String,
        require: true,
        min:5,
        unique: true,

    },
    email: {
        type:String,
        required: true,
        unique: true,
    },

    password : {
        type: String, 
        required:true,
        min:6,
    }
})


module.exports = mongoose.model("Users", userSchema)