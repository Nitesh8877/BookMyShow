const BookinController=require('../controllers/booking.controller');
const JwtToken=require('../middalware/auth.middleware');
const middalware=require('../middalware/validateBookingBodyReq')
module.exports=function(app){
    app.get('/mba/api/movie/booking', [JwtToken.verifyToken], BookinController.findAllBooking);
    app.post('/mba/api/movie/booking',[JwtToken.verifyToken,middalware.validateBookingRequestBody ], BookinController.createBooking);
    app.put('/mba/api/movie/booking/:bookingId', [JwtToken.verifyToken, JwtToken.isAdmin], BookinController.updateBooking);
    app.put('/mba/api/movie/booking/cancel/:bookingId', JwtToken.verifyToken, BookinController.cancelBooking);
    app.get('/mba/api/movie/booking/:bookingId',JwtToken.verifyToken, BookinController.findBookingById);

}