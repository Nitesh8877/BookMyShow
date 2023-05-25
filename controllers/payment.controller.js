const Payment=require('../models/payment.model');
const Booking=require('../models/booking.model');
const constant = require('../utils/constant');
const User=require('../models/user.model');
const {sendEmail} =require('../utils/NotificationClinet')

/**
 * user->theatre->movies->booking->payment
 */

exports.createPayment=async(req,res)=>{

    let booking=await Booking.findOne({
        _id:req.body.bookingId
    })
    console.log(booking)
    let bookingTime=booking.createdAt;
    let currentTime=Date.now();

    let minutes=Math.floor(((currentTime-bookingTime)/1000)/60);

    if(minutes>10){
        booking.status=constant.bookingStatus.expired;
        await booking.save();
        return res.status(200).send({
            message:"Can't do the payment as the booking is delayed and expired"
        })
    }

    let paymentObj={
        bookingId:req.body.bookingId,
        amount:req.body.amount,
        status:constant.paymentStatus.success
    }
    try {

        let payment=await  Payment.create(paymentObj);

        /**
         * Update the booking status
         */
            booking.status=constant.bookingStatus.completed
            await booking.save();
        let user=await User.findOne({
            "userId":req.userId
        })
        console.log(user,req.userId)
        // sendEmail(payment._id, "Payment successful for the booking id: "
        // +req.body.bookingId, JSON.stringify(booking),user.email,
        // 'mba-no-reply@mba.com'
        // )
        res.status(200).send(payment)

    } catch (error) {
        console.log(error)
        res.status(500).send({
            message:"Something went wrong 3",
            status:constant.paymentStatus.failed,
            data:error.message
        })
    }
}


exports.findPaymentById=async(req,res)=>{
    let paymentId=req.params.paymentId;
    try {
        let payment=await Payment.findOne({
            _id:paymentId
        })
        res.status(200).send({
            message:"Fetch Payment Details successfully",
            status:true,
            data:payment
        })
    } catch (error) {
        res.status(500).send({
            message:"Something went wrong 2",
            status:false,
            data:null
        })
    }
}

exports.findAllPayment=async(req,res)=>{
    const queryObj={}
    let userId=req.userId;
    let user=await User.findOne({_id:userId});
    
    if(user.userType===constant.userType.admin){

    }else{
        const bookings=await Booking.find({
            _id:req.userId
        })
        const bookingIds=bookings.map(b=>b._id);
        queryObj.bookingId={$in:bookingIds}
    }

    try {
        let payment=await Payment.find(queryObj);
        console.log(payment)
        res.status(200).send(payment)
    } catch (error) {
        res.status(500).send({
            message:"Something went wrong 1",
            status:false,
            data:null,
            err:error
        })
    }
}