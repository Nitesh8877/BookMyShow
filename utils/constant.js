/**
 * This will contain the constants names used through out the code
 */
module.exports = {
    releaseStatus: {
        unrealeased: 'UNRELEASED',
        released: 'RELEASED',
        blocked: 'BLOCKED'
    },
    userType:{
        admin:'ADMIN',
        customer:"CUSTOMER",
        client:'CLIENT'
    },
    userStatus:{
        approved:'APPROVED',
        pending:"PENDING",
        rejected:'REJECTED'
    },
    bookingStatus: {
        inProgress: 'IN_PROGRESS',
        completed: 'COMPLETED',
        cancelled: 'CANCELLED',
        expired: 'EXPIRED'
    },
    paymentStatus: {
        success: 'SUCCESS',
        failed: 'FAILED'
    },
    ticketPrice:150,
}