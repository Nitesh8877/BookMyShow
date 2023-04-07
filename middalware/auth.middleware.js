const jwt=require('jsonwebtoken');
const authConfig=require('../configs/auth.config');
const User=require('../models/user.model');
const constant=require('../utils/constant');
const Theatre=require('../models/theatre.model')
const verifyToken=(req, res,next)=>{
    let token=req.headers['x-access-token'];

    if(!token){
        return res.status(403).send("Token not provided")
    }
    jwt.verify(token,authConfig.SecretKey,(err,decoded)=>{
        if(err){
            return res.status(401).send("Unauthorized!");
        }
        req.userId=decoded.id
        next();
    })
}

//API endpoint -> verifyToken -> isAdmin -> Controller

const isAdmin=async(req,res,next)=>{
    try {
        let user=await User.findOne({
            userId:req.userId
        });

        if(user && user.userType===constant.userType.admin){
            next();
        }else{
            return res.status(403).send("Failed! User not admin...")
        }   

    } catch (error) {
        console.log(e.message);
        res.status(500).send("Internal Server Error!");
    }
}

const isAdminOrClient=async(req,res,next)=>{
    try {
        const user=await User.findOne({
            userId:req.userId
        })
        if(user && ((user.userType===constant.userType.admin) || user.userType===constant.userType.client)){
            if(user.userType===constant.userType.client){
                const theatre=await Theatre.findOne({
                    _id:req.params.id
                }) 
                if(String(theatre.ownerId!=String(user._id))){
                    return res.status(403).send({
                        message:"Client requesting to update the theatre is not the owner! "
                    })
                }else{
                    next();
                }
            }else{
                next();
            }
        }else{
            return res.status(403).send({
                message:"Required admin role or clinent role!"
            })
        }
        
    } catch (error) {
        return res.status(500).send("Internal Server Error!")
    }
}

module.exports={
    isAdmin:isAdmin,
    verifyToken:verifyToken,
    isAdminOrClient:isAdminOrClient
}