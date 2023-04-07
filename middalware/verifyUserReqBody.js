const User=require('../models/user.model');
const constant=require('../utils/constant');

const isValidEmail=(email)=>{
    return (email).toLowerCase().match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ); 
};

/**
 * Steps
 * 1. Validate the name
 * 2. Validate the userid
 * 3. Validate the email
 * 4. Validate the userType
 */

const validateUserRequestBody=async(req,res,next)=>{
    
    if(!req.body.name){
        return res.status(400).send("Faild! Name of the user not provided")
    }

    if(!req.body.userId){
        return res.status(400).send("Failed! userId of the user not provided")
    }
    if(!req.body.password){
        return res.status(400).send("Failded! Password of the user not provided")
    }

    try {
        let user=await User.findOne({
            userId:req.body.userId
        })
        if(user!=null){
            return res.status(400).send("Failed! UserId already exist")
        } 
        
    } catch (error) {
        return res.status(500).send("Internal Server Error! ")
    }
    if(!isValidEmail(req.body.email)){
        return res.status(400).send("Failed! Invalid Email address")
    }

    try {
        let user=await User.findOne({
            email:req.body.email
        })
        if(user!=null){
            return res.status(400).send("Failed! Email is already taken")
        }
        
    } catch (error) {
        return res.status(500).send("Internal Server Error! ")
    }
    const userType=req.body.userType;
    const userTypes=[
        constant.userType.admin,
        constant.userType.customer,
        constant.userType.client
    ]
    if(!userType || !userTypes.includes(userType)){
      res.status(400).send(
            "Failed! UserTypep provide is invalid. Possible values CUSTOMER | CLIENT | ADMIN "
        )
        return ;
    }
    next();
}

const validateUserStatusAndUserType=async(req,res,next)=>{
    //validating the user type 

    const userType=req.body.userType;
    const userTypes=[
        constant.userType.admin,
        constant.userType.customer,
        constant.userType.client
    ]
    if(userType && !userTypes.includes(userType)){
        res.status(400).send(
              "Failed! UserTypep provide is invalid. Possible values CUSTOMER | CLIENT | ADMIN "
          )
          return ;
      }
      const userStatus=req.body.userStatus;
      const UserStatus=[
        constant.userStatus.approved,
        constant.userStatus.pending,
        constant.userStatus.rejected
      ]
      if(userStatus && !UserStatus.includes(userStatus)){
        res.status(200).send("Failed! UserStatus provided is invalid. Possible values APPROVED | PENDING | REJECTED");
        return;
      }

      next();
}

const validateUserReqBody={
    validateUserRequestBody:validateUserRequestBody,
    validateUserStatusAndUserType:validateUserStatusAndUserType
}
module.exports=validateUserReqBody;
