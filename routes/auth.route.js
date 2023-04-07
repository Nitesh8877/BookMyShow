const AuthController=require('../controllers/auth.controller');
const verifyRequestBody=require('../middalware/verifyUserReqBody');

module.exports=function(app){
    app.post('/mba/api/auth/singup',verifyRequestBody.validateUserRequestBody,verifyRequestBody.validateUserStatusAndUserType, AuthController.signup);
    app.post('/mba/api/auth/singin', AuthController.singin);
}