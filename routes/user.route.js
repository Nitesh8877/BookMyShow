const UserController=require('../controllers/user.controller');
const jwt=require('../middalware/auth.middleware');

module.exports=function(app){
    app.put('/mba/api/users',[jwt.verifyToken] ,UserController.update);
    app.put('/mba/api/users/:userId',[jwt.verifyToken, jwt.isAdmin], UserController.updateUser);
}

