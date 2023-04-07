const mongoose=require('mongoose');
const constant=require('../utils/constant');
const PaymentSchema=new mongoose.Schema({
        bookingId:{
            type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "Booking"
        },
        amount:{
            type:Number,
            // required:true,
        },
        status:{
            type:String,
            default:constant.paymentStatus.failed
        },
        createdAt:{
            type:Date,
            immutable:true,
            default:()=>{
                return Date.now();
            }
        },
        updatedAt:{
            type:Date,
            immutable:true,
            default:()=>{
                return Date.now();
            }
        }
})

const Payment=mongoose.model('Payment', PaymentSchema);

module.exports=Payment;