const User=require('../models/user.model');
const bcrypt=require('bcryptjs');

//only update the password
exports.update=async(req,res)=>{
    console.log(req.body,req.userId)
    console.log(req.password)
    try {
        const user=await User.findOneAndUpdate({userId:req.userId},{password:bcrypt.hashSync(req.body.password,8)}).exec();
        res.status(200).send({
            message:"User Password update successfully"
        })
        
    } catch (error) {
        res.status(500).send({
            message:"some internal error occurd!"
        })
    }
}
 
//update user status and user type by admin 

exports.updateUser=async(req,res)=>{
    console.log(req.body)
    let userIdReq=req.params.userId;
    try {
        const user = await User.findOneAndUpdate({
            userId: userIdReq
        },{
            name:req.body.name,
            userType:req.body.userType,
            userStatus:req.body.userStatus
        }).exec();

        console.log(user)
        res.status(200).send("User record update successfully!! ")
        
    } catch (error) {
        res.status(500).send({
            message:"something went wrong user update details"
        })
    }
}
