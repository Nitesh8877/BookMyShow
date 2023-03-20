const Movie=require('../models/movie.model');

exports.getAllMovies=async(req,res)=>{
    let objQury={};
    if(req.query.name!=undefined){
        objQury.name=req.query.name;
    }
    console.log(objQury)
    try{
        const movies=await Movie.find(objQury);
        console.log(objQury)
        res.status(200).send(movies);
    }catch(err){
        res.status(500).send({
            message:err.message
        })
        console.log(err);
    }

}

exports.getMovieById=async (req,res)=>{

    try{
        let movie=await Movie.find({
            _id:req.params.id
        })
        res.status(200).send({
            message:"fetch data successfull",
            success:true,
            data:movie
        })
    }catch(err){
        res.status(200).send({
            message:"fetch data failed",
            success:false,
            data:{}
        })
    }
}

exports.createMovie = async (req, res) => {
    const movieObject = {
        name: req.body.name,
        description: req.body.description,
        casts: req.body.casts,
        director: req.body.director,
        trailerUrl: req.body.trailerUrl,
        posterUrl: req.body.posterUrl,
        language: req.body.language,
        releaseDate: req.body.releaseDate,
        releaseStatus: req.body.releaseStatus
    }
 
    try {
        const movie = await Movie.create(movieObject);
        res.status(201).send(movie);
    } catch (e) {
        console.log(e.message)
    }
}

exports.updateMovie = async (req, res) => {

    const savedMovie = await Movie.findOne({ _id: req.params.id });

    if (!savedMovie) {
        res.status(400).send({
            message: "Movie being updated doesn't exist"
        });
    }

    savedMovie.name = req.body.name != undefined ? req.body.name : savedMovie.name
    savedMovie.description = req.body.description != undefined ? req.body.description : savedMovie.description
    savedMovie.casts = req.body.casts != undefined ? req.body.casts : savedMovie.casts
    savedMovie.director = req.body.director != undefined ? req.body.director : savedMovie.director
    savedMovie.trailerUrl = req.body.trailerUrl != undefined ? req.body.trailerUrl : savedMovie.trailerUrl
    savedMovie.posterUrl = req.body.posterUrl != undefined ? req.body.posterUrl : savedMovie.posterUrl
    savedMovie.language = req.body.language != undefined ? req.body.language : savedMovie.language
    savedMovie.releaseDate = req.body.releaseDate != undefined ? req.body.releaseDate : savedMovie.releaseDate
    savedMovie.releaseSatus = req.body.releaseSatus != undefined ? req.body.releaseSatus : savedMovie.releaseSatus

    try {
        var updatedMovie = await savedMovie.save();
        res.status(200).send(updatedMovie);
    } catch (e) {
        console.log(e.message)
    }
}

exports.deleteMovie = async (req, res) => {

    try {
        await Movie.deleteOne({
            _id: req.params.id
        });
        res.status(200).send({
            message: "Successfully delete movie with id [ " + req.params.id + " ]"
        });
    } catch (e) {
        console.log(e.message)
    }

};