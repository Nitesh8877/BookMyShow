const mongoose=require('mongoose');

const UserScehma=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        requried:true,
        unique:true,
    },
    password:{
        type:String,
        requried:true,
    },
    email:{
        type:String,
        requried:true,
        lowercase:true,
        minLength:10,
        unique:true,
    },
    userType:{
        type:String,
        required:true,
        default:"CUSTOMER",
    },
    userStatus:{
        type:String,
        requried:true,
        default:"APPROVED"
    },
    // imagePath:{
    //     type:String,
    //     requried:true,
    // }


},{timestamps:true})

const UserModal=mongoose.model("User", UserScehma);

module.exports=UserModal;