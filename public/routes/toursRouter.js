const express = require('express');
const toursController = require('../../controllers/toursController');

const router = express.Router();

// router.param('id', toursController.checkID);

router
  .route('/top-5-cheap')
  .get(toursController.aliasTopTour, toursController.getAllTours);

router.route('/tour-stats').get(toursController.getTourStats);

router
  .route('/')
  .post(toursController.createTour)
  .get(toursController.getAllTours);
router
  .route('/:id')
  .get(toursController.getTour)
  .patch(toursController.updateTour)
  .delete(toursController.deleteTour);

module.exports = router;
