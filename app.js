const serverConfig = require('./configs/server.config');
const bodyParser = require('body-parser');
const dbConfig = require('./configs/db.config');
const Movie = require('./models/movie.model')
const mongoose = require('mongoose')
const express = require('express');
const Theatre=require('./models/theatre.model')
const User=require('./models/user.model');
const Payment=require('./models/payment.model');
const bcrypt=require('bcryptjs');
const constant=require('./utils/constant');
//Initializing express
const app = express();

//Using the bodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

/**
 * DB connection 
 */
mongoose.connect(dbConfig.DB_URL);
app.use(express.json());
const db = mongoose.connection
db.on("error", () => console.log("Can't connect to DB"));
db.once("open", () => {
    console.log("Connected to mongo DB");
    init();
})

async function init() {

    try {
        await User.collection.drop()
        const user=await User.create({
            name:"nitesh",
            userId:"admin",
            email:"kumarnitesh88441@gmail.com",
            userType:constant.userType.admin,
            password:bcrypt.hashSync('Welcome',8)
        })
    
        console.log("Admin User Created");
        await User.create({
            name:"madhu",
            userId:"customer",
            email:"madhu88@gmail.com",
            userType:constant.userType.customer,
            password:bcrypt.hashSync("Welcome",8)
        })
        
    } catch (error) {
        console.log(error.message)
    }
   
    let client1, client2,client3
        try {
            client1 = await User.create({
                name: "Client1",
                userId: "client01",
                email: "client01@gmail.com",
                userType: constant.userType.client,
                password: bcrypt.hashSync("client01", 8)
            })
            client2 = await User.create({
                name: "Client2",
                userId: "client02",
                email: "client02@gmail.com",
                userType: constant.userType.client,
                password: bcrypt.hashSync("client02", 8)
            })
            client3 = await User.create({
                name: "Client3",
                userId: "client03",
                email: "client03@gmail.com",
                userType: constant.userType.client,
                password: bcrypt.hashSync("client03", 8)
            })
            console.log("Clients created")
            
        } catch (error) {
            console.log("Something went wrong line 81", error.message)
        }
    
    await Movie.collection.drop();
    try {
      const movie1= await Movie.create({
            name: "Bachhan Pandey",
            description: "Comedy Masala Movie",
            casts: ["Akshay Kumar", "Jacqueline Fernandiz"],
            director: "Farhad Samji",
            trailerUrl: "http://bacchanpandey/trailers/1",
            posterUrl: "http://bacchanpandey/posters/1",
            language: "Hindi",
            releaseDate: "18-03-2022",
            releaseSatus: "RELEASED"
        });
      const movie2=  await Movie.create({
            name: "Jalsa",
            description: "Intense Drama Movie",
            casts: ["Vidya Balan", "Shefali Shah"],
            director: "Suresh Triveni",
            trailerUrl: "http://jalsa/trailers/1",
            posterUrl: "http://jalsa/posters/1",
            language: "Hindi",
            releaseDate: "18-03-2022",
            releaseSatus: "RELEASED"
        });
      const movie3=  await Movie.create({
            name: "Jhund",
            description: "Comedy Drama Movie",
            casts: ["Amitabh Bachchan", "Abhinay Raj"],
            director: "Nagraj Manjule",
            trailerUrl: "http://jhund/trailers/1",
            posterUrl: "http://jhund/posters/1",
            language: "Hindi",
            releaseDate: "04-03-2022",
            releaseSatus: "RELEASED"
        });
      const movie4=  await Movie.create({
            name: "Radhe Shyam",
            description: "Comedy Drama Movie",
            casts: ["Prabhas", "Pooja Hegde"],
            director: "Radha Krishna Kumar",
            trailerUrl: "http://RadheShyam/trailers/1",
            posterUrl: "http://RadheShyam/posters/1",
            language: "Hindi",
            releaseDate: "11-03-2022",
            releaseSatus: "RELEASED"
        });
     const movie5=   await Movie.create({
            name: "The Kashmir Files",
            description: "Intense Movie",
            casts: ["Mithun Chakraborty", "Anupam Kher"],
            director: "Vivek Agnihotri",
            trailerUrl: "http://TheKashmirFiles/trailers/1",
            posterUrl: "http://TheKashmirFiles/posters/1",
            language: "Hindi",
            releaseDate: "11-03-2022",
            releaseSatus: "RELEASED"
        });
        await Theatre.collection.drop();
        await Theatre.create({
            name: "FunCinemas",
            city: "Bangalore",
            description: "Top class theatre",
            pinCode: 560052,
            movies:[movie1._id,movie2._id,movie3._id],
            ownerId:client1._id
        });
        await Theatre.create({
            name: "PVR Cinemas - Kormangala",
            city: "Bangalore",
            description: "PVR franchise theatre",
            pinCode: 560095,
            movies:[movie1._id,movie4._id,movie5._id],
            ownerId:client1._id
        });
        await Theatre.create({
            name: "IMax",
            city: "Bangalore",
            description: "IMax franchise theatre",
            pinCode: 560095,
            movies:[movie1._id,movie3._id,movie3._id],
            ownerId:client2._id
        });
        await Theatre.create({
            name: "Vaibhav Theatre",
            city: "Bangalore",
            description: "Economical theatre",
            pinCode: 560094,
            movies:[movie4._id,movie5._id,movie3._id],
            ownerId:client2._id
        });
        await Theatre.create({
            name: "Inox",
            city: "Pune",
            description: "Top class theatre",
            pinCode: 411001,
            movies:[movie1._id,movie2._id],
            ownerId:client3._id
        });
        await Theatre.create({
            name: "Sonmarg Theatre",
            city: "Pune",
            description: "Economical theatre",
            pinCode: 411042,
            movies:[movie4._id,movie2._id,movie5._id],
            ownerId:client3._id
        });
    
        console.log("Theatres created");


    } catch (err) {
        console.log(err)
    }
    try {
        await Payment.collection.drop();
        await Payment.create({
            bookingId:"6426816958a444dc08742aa5",
            amount:1500,
            status:constant.paymentStatus.success
        })
        console.log("Payment successfully")
        await Payment.create({
            bookingId:"6426819158a444dc08742aa8",
            amount:300,
            status:constant.paymentStatus.success
        })
        await Payment.create({
            bookingId:"6426819958a444dc08742aab",
            amount:500,
            status:constant.paymentStatus.success
        })
        await Payment.create({
            bookingId:"6426f19d85e5473287c29e52",
            amount:700,
            status:constant.paymentStatus.success
        })
        
    } catch (error) {
        
    }
}

require('./routes/movie.route')(app);
require('./routes/theatre.route')(app);
require('./routes/auth.route')(app);
require('./routes/user.route')(app)
require('./routes/booking.route')(app);
require('./routes/payment.route')(app);
app.listen(serverConfig.PORT, () => {
    console.log("server started is this port number: ", serverConfig.PORT);
})