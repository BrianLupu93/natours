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

// exports.getTour = (req, res) => {
//   const id = req.params.id * 1;
//   const tour = tours.find((tour) => tour.id === id);

//   res.status(200).json({
//     status: 'success',
//     data: {
//       tour,
//     },
//   });
// };

// exports.getAllTours = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// };

// exports.updateTour = (req, res) => {
//   res.status(200).json({
//     status: 'success',
//     data: {
//       tours: 'Upddate tour here',
//     },
//   });
// };

// exports.deleteTour = (req, res) => {
//   const id = req.params.id * 1;

//   const newTours = tours.filter((tour) => tour.id !== id);

//   fs.writeFile(
//     `${__dirname}/dev-data/data/tours-simple.json`,
//     JSON.stringify(newTours),
//     (err) => {
//       res.status(201).json({
//         status: 'success',
//         message: `Tour with id ${id} deleted`,
//       });
//     }
//   );
// };
