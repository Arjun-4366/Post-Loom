const mongoose = require('mongoose')

const userModel = mongoose.Schema({
 
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    image:{
        type:String,
        required:false
    },
   
},
{
    timestamps:true
})


module.exports = mongoose.model('users',userModel)