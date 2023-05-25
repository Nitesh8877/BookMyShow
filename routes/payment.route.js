const PaymentController=require('../controllers/payment.controller');
const validatePaymentReqBody=require('../middalware/validatePaymentBodyReq');
const verifytoken=require('../middalware/auth.middleware');
module.exports=function(app){

    app.post('/mba/app/payments',[verifytoken.verifyToken, validatePaymentReqBody.validatePaymentReqBody] ,PaymentController.createPayment);
    app.get('/mba/api/payments/:paymentId', [verifytoken.verifyToken], PaymentController.findPaymentById);
    app.get('/mba/api/payments',[verifytoken.verifyToken], PaymentController.findAllPayment );
    
}