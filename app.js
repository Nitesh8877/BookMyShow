const serverConfig = require('./configs/server.config');
const bodyParser = require('body-parser');
const dbConfig = require('./configs/db.config');
const Movie = require('./models/movie.model')
const mongoose = require('mongoose')
const express = require('express');

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
    await Movie.collection.drop();
    try {
        await Movie.create({
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
        await Movie.create({
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
        await Movie.create({
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
        await Movie.create({
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
        await Movie.create({
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
    } catch (err) {
        console.log(err)
    }
}

require('./routes/movie.route')(app);

app.listen(serverConfig.PORT, () => {
    console.log("server started is this port number: ", serverConfig.PORT);
})