const User=require('../models/user.model');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const contants=require('../utils/constant');
const constant = require('../utils/constant');
const authConfig=require('../configs/auth.config');
exports.signup=async(req,res)=>{
    
    let userStatus=req.body.userStatus;
    if(!userStatus){
        //user is customber and user status is approved
        if(!req.body.userType || req.body.userType===contants.userType.customer){
            userStatus=constant.userStatus.approved
        }else{
            userStatus=constant.userStatus.pending
        }
    }
    //create a new user

    try {
        let user=await User.create({
            name:req.body.name,
            userId:req.body.userId,
            email:req.body.email,
            userType:req.body.userType,
            userStatus:req.body.userStatus,
            password:bcrypt.hashSync(req.body.password,8),
            
        })
        let response={
            user:user.name,
            userId:user.userId,
            email:user.email,
            userType:user.userType,
            userStatus:user.userStatus,
            message:"Registration succeffully"
        }
        res.status(200).send(response);
        
    } catch (error) {
        res.status(500).send({
            message:"Something went wrong "
        })

        console.log(error.message);
    }
}

exports.singin=async(req,res)=>{
    /**
     * Steps
     * 1. check the userId in the collection
     * 2. check the status of the user
     * 3. check the password
     * 4. send the jwt token back
     */

    try {
        let user =await User.findOne({userId:req.body.userId});;
        if(user===null){
            return res.status(401).send("User with the given userId not found!")
        }
        if(user.userStatus!==constant.userStatus.approved){
          return  res.status(403).send("User is not yet approved")
        }
        const isPasswordValid=bcrypt.compareSync(req.body.password,user.password)
        if(!isPasswordValid){
         return  res.status(403).send("Invalid Password")
        }
        const token=jwt.sign({id:user.userId},authConfig.SecretKey,{expiresIn:3600})
        res.status(200).send({
            name:user.name,
            userId:user.userId,
            email:user.email,
            userType:user.userType,
            userStatus:user.userStatus,
            token:token
        })
    } catch (error) {
        res.status(500).send({
            message:"Internal server error  occured"
        })
    }
}

exports.getAllUsers=async(req,res)=>{
    try {
        let result=await User.find()
        res.status(200).send({
            message:"fetch data succefully",
            data:result
        })
        
    } catch (error) {
        res.satus(500).send({
            message:"Something went wrong",
            status:false,
            ErrorMessage:error.message
        })
    }
}