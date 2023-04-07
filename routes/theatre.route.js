const theatreController = require("../controllers/theatre.controller");
const {validateTheatreRequestBody}=require('../middalware/validateTheatreReqBody');
const jwt=require('../middalware/auth.middleware');
/**
 * Routes for the movie resource
 */

module.exports = function (app) {
    app.get("/mba/api/theatres",[jwt.verifyToken] ,theatreController.getAllTheatres);
    app.get("/mba/api/theatres/:id", [jwt.verifyToken],theatreController.getTheatre);
    app.post("/mba/api/theatres",[jwt.verifyToken,jwt.isAdmin,validateTheatreRequestBody], theatreController.createTheatre);
    app.put("/mba/api/theatres/:id",[jwt.verifyToken ,jwt.isAdminOrClient ,validateTheatreRequestBody], theatreController.updateTheatre);
    app.delete("/mba/api/theatres/:id",[jwt.verifyToken, jwt.isAdmin], theatreController.deleteTheatre);
    app.put('/mba/api/theatres/:id/movies',[jwt.verifyToken, jwt.isAdminOrClient],theatreController.putMoviesToTheatre);
    app.get('/mba/api/theatres/:theatreId/movies/:movieId',[jwt.verifyToken], theatreController.checkMovieInsideATheatre);
}