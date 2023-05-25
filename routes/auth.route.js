const AuthController=require('../controllers/auth.controller');
const verifyRequestBody=require('../middalware/verifyUserReqBody');
const {upload}=require('../middalware/imageUpload')
module.exports=function(app){
    app.post('/mba/api/auth/singup',upload.single("photo"),verifyRequestBody.validateUserRequestBody,verifyRequestBody.validateUserStatusAndUserType, AuthController.signup);
    app.post('/mba/api/auth/singin', AuthController.singin);
    app.get('/mba/api/users', AuthController.getAllUsers)
}