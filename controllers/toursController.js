// const fs = require('fs');
const Tour = require('./../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`)
// );

// exports.checkID = (req, res, next, value) => {
//   if (req.params.id > tours.length)
//     return res
//       .status(404)
//       .json({ status: 'Failed', message: 'Tour Not Found (Invalid ID)' });
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res
//       .status(400)
//       .json({ status: 'Failed', message: 'Tour name or price is missing' });
//   }
//   next();
// };

exports.createTour = async (req, res) => {
  // const newTour = new Tour({})
  // newTour.save()

  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: 'Failed',
      message: err.message,
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'Failed', message: err.message });
  }
};

exports.getAllTours = async (req, res) => {
  try {
    // Buidl the query
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    const query = Tour.find(queryObj);
    // const query = Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

    // Execute the query
    const tours = await query;

    // Send Rescponse
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'Failed', message: err.message });
  }
};

exports.updateTour = async (req, res) => {
  console.log(req.body);

  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({ status: 'Failed', message: err });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id, req.body);
    res.status(204).json({
      status: 'success',
      message: `Tour ${req.params.id} deleted`,
    });
  } catch (err) {
    res.status(404).json({ status: 'Failed', message: err });
  }
};
