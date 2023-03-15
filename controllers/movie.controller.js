const Movie=require('../models/movie.model');

exports.getAllMovies=async(req,res)=>{
    let objQury={};

    if(req.query.name!=undefined){
        objQury.name=req.query.name;
    }
    console.log(objQury)
    try{
        const movies=Movie.find(objQury);
        console.log(objQury)
        res.status(200).send(movies);
    }catch(err){
        console.log(err);
    }

}
