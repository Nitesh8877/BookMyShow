const MovieController=require('../controllers/movie.controller');

module.exports=function(app){
    app.get("/mba/api/movies",MovieController.getAllMovies);
    app.get("/mba/api/movie/:id",MovieController.getMovieById);
}