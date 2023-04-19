// const fs = require('fs');
const Tour = require('./../models/tourModel');

exports.aliasTopTour = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

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
    console.log(req.query);
    // Buidl the query
    // 1A. Filtering
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // 1B. Advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );
    // const query = Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

    let query = Tour.find(JSON.parse(queryString));

    // 2. Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(req.query.sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    //  3. Fields Limiting

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // Pagination
    // ?page=2&limit=10 === 1-10 page1, 11-20 page2, 21-30 page3, 31-40 page4 ....
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const toursNumber = await query.countDocuments();
      if (skip >= toursNumber) throw new Error('Page does not exist');
    }

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
