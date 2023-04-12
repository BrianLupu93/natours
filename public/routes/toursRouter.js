const express = require('express');
const toursController = require('../controllers/toursController');

const router = express.Router();

router.param('id', toursController.checkID);

router
  .route('/')
  .get(toursController.getAllTours)
  .post(toursController.checkBody, toursController.createTour);
router
  .route('/:id')
  .get(toursController.getTour)
  .delete(toursController.deleteTour)
  .patch(toursController.updateTour);

module.exports = router;