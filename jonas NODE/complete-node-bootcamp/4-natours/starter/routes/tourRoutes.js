const exp = require('express');
const tourController = require('./../controllers/tourController');
//creating router
const router = exp.Router();

//checks if the url contains a specific parameter!
router.param('id', tourController.checkID);
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour); //chaining middlewars (more than two at a time)
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);
module.exports = router;
