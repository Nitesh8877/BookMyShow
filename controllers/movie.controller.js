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



