const Booking=require('../models/booking.model');
const User=require('../models/user.model')
const constant=require('../utils/constant');
exports.createBooking=async(req,res)=>{

    const user=await User.findOne({
        userId:req.userId
    })
    console.log(user)
    var bookingObject={
        theatreId:req.body.theatreId,
        movieId:req.body.movieId,
        userId:req._id,
        timing:req.body.timing,
        noOfSeats:req.body.noOfSeats,
        totalCost:(req.body.noOfSeats*constant.ticketPrice)
    }
    console.log(bookingObject)
    try {
        let booking=await Booking.create(bookingObject);
        res.status(200).send({
            message:"Successfull booking movie ticket",
            status:constant.paymentStatus.success,
            data:booking
        })
        
    } catch (error) {
        res.status(500).send({
            message:"Something went wrong please try after sometime",
            status:constant.paymentStatus.failed,
            error:error.message
        })
    }
}

exports.updateBooking=async(req,res)=>{
 
    let bookingId=req.params.bookingId;

    let booking=await Booking.findOne({_id:bookingId})
        booking.theatreId=req.body.theatreId!=undefined?req.body.theatreId:booking.theatreId,
        booking.movieId=req.body.movieId!=undefined?req.body.movieId:booking.movieId,
        booking.userId=req.body.userId!=undefined?req.body.userId:booking.userId,
        booking.timing=req.body.timing!=undefined?req.body.timing:booking.timing,
        booking.noOfSeats=req.body.noOfSeats!=undefined?req.body.noOfSeats:booking.noOfSeats,
        booking.totalCost=booking.noOfSeats*constant.ticketPrice,
        booking.status=req.body.status!=undefined?req.body.status:booking.status

        try {
            let updateBooking=await booking.save();
            res.status(200).send({
                message:"booking data update successfully",
                status:true,
                data:updateBooking
            })
            
        } catch (error) {
            res.status(500).send({
                message:"something went wrong",
                status:false,
                data:null
            })
        }
}

exports.cancelBooking=async(req,res)=>{
    let bookingId=req.params.bookingId;
    let booking=await Booking.findOne({_id:bookingId})
    booking.status=constant.bookingStatus.cancelled;
    try {
      let updateBooking=await booking.save();
      res.status(200).send({
        message:"Booking ticket cancel successfully! ",
        status:true,
        data:updateBooking
      })
    } catch (error) {
        res.status(500).send({
            message:"Something went wrong ",
            status:false,
            data:null
        })
    }
}

exports.findBookingById=async(req,res)=>{
    let bookingId=req.params.bookingId
    try {
        let booking=await Booking.findOne({_id:bookingId})
        res.status(200).send({
            message:"booking data fetch successfully",
            status:true,
            data:booking
        })
        
    } catch (error) {
        res.status(500).send({
            message:"Something went wrong ",
            status:false,
            data:null
        })
    }
}

exports.findAllBooking=async(req,res)=>{
    let user;
    try {
        user = await User.findOne({
            userId: req.userId
        })
    } catch (e) {
        console.log(e.message)
        res.status(500).send("Internal Server Error")
    }
    console.log(user);
    const queryObj = {};
    if (user.userType === constant.userType.admin) {
    } else {
        queryObj._id = user._id
    }
    
    try {
        const bookings = await Booking.find(queryObj);
        res.status(200).send(bookings);
    } catch (e) {
        console.log(e.message)
        res.status(500).send("Internal Server Error!")
    }
}