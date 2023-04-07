const Theatre = require('../models/theatre.model')
const Movie=require('../models/movie.model')
const userModel=require('../models/user.model')
const {sendEmail} =require('../utils/NotificationClinet')
exports.createTheatre = async (req, res) => {
    const theatreObject = {
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        pinCode: req.body.pinCode,
        ownerId:req.body.ownerId
    }

    try {
        const theatre = await Theatre.create(theatreObject);
        const owner=await userModel.findOne({
            _id:theatre.ownerId
        })
        console.log(owner)
        sendEmail(theatre._id,"New theatre created with the theatre id: "+theatre._id,
        JSON.stringify(theatre),owner.email,"mba-no-reply@mba.com"
        )
        res.status(201).send(theatre);
    } catch (e) {
        console.log(e.message,e)
    }
}

/**
 * Get the list of all the theaters
 */
exports.getAllTheatres = async (req, res) => {
    const queryObj = {};

    if (req.query.name != undefined) {
        queryObj.name = req.query.name;
    }
    if (req.query.city != undefined) {
        queryObj.city = req.query.city;
    }
    if (req.query.pinCode != undefined) {
        queryObj.pinCode = req.query.pinCode;
    }

    try {
        const theatres = await Theatre.find(queryObj);
        res.status(200).send(theatres);
    } catch (e) {
        console.log("Get all failed beacuase: ", e.message)
    }
}

/**
 * Get the theatre based on theatre id
 */
exports.getTheatre = async (req, res) => {
    try {
        const theatre = await Theatre.findOne({
            _id: req.params.id
        });
        res.status(200).send(theatre);
    } catch (e) {
        console.log(e.message)
    }
}

/**
 * Update a theatre
 */
exports.updateTheatre = async (req, res) => {

    const savedTheatre = await Theatre.findOne({ _id: req.params.id });

    if (!savedTheatre) {
        return res.status(400).send({
            message: "Theatre being updated doesn't exist"
        });
    }

    savedTheatre.name = req.body.name != undefined
        ? req.body.name // True -> req.body.name is not undefined
        : savedTheatre.name; // else
    savedTheatre.description = req.body.description != undefined ? req.body.description : savedTheatre.description;
    savedTheatre.city = req.body.city != undefined ? req.body.city : savedTheatre.city;
    savedTheatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode : savedTheatre.pinCode;

    try {
        var updatedTheatre = await savedTheatre.save();
        console.log(updatedTheatre);
        const owner=await userModel.findOne({
            _id:updatedTheatre.ownerId
        })
        sendEmail(
            updatedTheatre._id,
            "Updated thaatre with the theatre id: "+ updatedTheatre._id,
            JSON.stringify(updatedTheatre),
            owner.email,
            "mba-no-reply@mba.com"
        )
        res.status(200).send(updatedTheatre);
    } catch (e) {
        console.log(e.message)
    }
}

/**
 * Delete a theatres
 */
exports.deleteTheatre = async (req, res) => {
    try {
        const savedTheatre = await Theatre.findOne({
            _id: req.params.id
        })
        await Theatre.deleteOne({
            _id: req.params.id
        });

        const owner = await userModel.findOne({
            _id: savedTheatre.ownerId
        })

        sendEmail(
            savedTheatre._id,
            "Theatre deleted with the theatre id: " + savedTheatre._id,
            "Theatre Deleted",
            owner.email,
            "mba-no-reply@mba.com"
        )
        res.status(200).send({
            message: "Successfully deleted theatre with id [ " + req.params.id + " ]"
        });
    } catch (e) {
        console.log(e.message)
    }
}

/**
 * Add or remove movie inside a theatre
 */

exports.putMoviesToTheatre=async(req,res)=>{
    const savedTheatre=await Theatre.findOne({
            _id:req.params.id
    })
    const movieId=req.body.movieId;
    console.log(savedTheatre)
    if(req.body.insert){ //Added movies Id inside of the theatre 
        movieId.forEach(movieId=>{
            savedTheatre.movies.push(movieId)
            //To solve for duplicates use Set for movies

        })
    }else{ //Remove Movies Id from the theatre
        let savedMovieIds=savedTheatre.movies
        console.log(savedMovieIds)
        movieId.forEach(moviesId => {
            savedMovieIds = savedMovieIds.filter(
                element => element != moviesId
            )
        })
        savedTheatre.movies=savedMovieIds
    }
    try{
        const updatedTheatre=await savedTheatre.save()
        res.status(200).send(updatedTheatre)
    }catch(e){
        console.log(e.message)
    }
}

exports.checkMovieInsideATheatre=async(req,res)=>{
    const savedTheatre=await Theatre.findOne({
        _id:req.params.theatreId
    })
    const savedMovie=await Movie.findOne({
        _id:req.params.movieId
    })

    try {
        const responseBody={
            message:savedTheatre.movies.includes(savedMovie._id)
                    ?"Movie is present"
                    :"Movie is not present"
        }
        res.status(200).send(responseBody)

    } catch (error) {
        res.status(500).send({
            message:"some internal error occurs",error
        })
    }
}