const Payment=require('../models/payment.model');
const ObjectId=require('mongoose').Types.ObjectId
const constant=require('../utils/constant');
const Booking=require('../models/booking.model')
/**
 * validate the all details
 * steps
 * 1. bookingId
 * 2. total payment
 * 3. payment status
 */

const validatePaymentReqBody=async(req,res,next)=>{

    //validate for the booking id

    if(!req.params.bookingId){
        return res.status(400).send({
            message:"Failed! Booking Id is not provied"
        })
    }

    if(!ObjectId.isValid(req.params.bookingId)){
        return res.status(400).send({
            message:"Failed! Booking Id Provied is Wrong"
        })
    }
    //validate if the booking exists
    const booking=await Booking.findOne({
        _id:req.body.bookingId
    })
    if(booking==null){
        return res.status(400).send({
            message:"Failed! Booking Id passed does't exits! "
        })
    }
    /**
     * Check for the amount
     */
    console.log(req.body.amount, booking)

    if(req.body.amount<booking.totalCost){
        return res.status(400).send({
            message:"Can't do the payment as the payment amount is less than the booking amount",
            Your_actual_price:booking.totalCost
        })
    }
    next();

}

module.exports={
    validatePaymentReqBody:validatePaymentReqBody
}