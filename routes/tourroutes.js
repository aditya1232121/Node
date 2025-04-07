const express = require('express');
const tourController = require('../controllers/tourcontroller'); // Fixed inconsistent naming

const authController = require('../controllers/authcontroller')

const tourRouter = express.Router(); // using routes as a middleware

// router.param('id', tourController.checkID);

// Router.param('id' , (req , res , next , val) => {
//     console.log(`Tour id is ${val}`)
//         next();
// });

tourRouter
  .route('/top-2-cheap')
  .get(tourController.aliastoptours, tourController.getalltours);

tourRouter.route('/tour-stats').get(tourController.getTourStats); // Fixed naming
tourRouter.route('/monthlyplan/:year').get(tourController.getmonthlyplan)

tourRouter
  .route('/')
  .get(authController.protect ,tourController.getalltours)
  .post(tourController.createtour);

tourRouter
  .route('/:id')
  .get(tourController.gettour)
  .patch(tourController.updatetour)
  .delete(authController.protect ,
     authController.restrictTo('admin') ,
     tourController.deletetour);

module.exports = tourRouter;
