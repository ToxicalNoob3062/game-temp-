const fs = require('fs');
const dir = `${__dirname}`;
//fetching data from json
const tours = JSON.parse(
  fs.readFileSync(dir + '/../dev-data/data/tours-simple.json')
);
//tour route functions
module.exports.checkID = (req, res, next, val) => {
  //its a middleware
  console.log(val);
  if (val > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }
  next();
};
module.exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'unsuccessful',
      message: 'name or price is undefined!',
    });
  }
  next();
};
module.exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    request_time: req.requestTime, //manupulated requestTime in middleware!
    results: tours.length,
    data: {
      tours,
    },
  });
};
module.exports.getTour = (req, res) => {
  //example: '/api/v1/tours/:id/:x/:y?'
  //here req.params refers to any :x in url in obj form!
  //:y? makes that field optional for users!
  //{ id: '5', x: '2', y: '1' }
  //{ id: '5', x: '2', y: undefined }
  const id = req.params.id * 1;
  let searched_tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      searched_tour,
    },
  });
};

module.exports.createTour = (req, res) => {
  const new_Id = tours[tours.length - 1].id + 1;
  const new_tour = Object.assign({ id: new_Id }, req.body);
  tours.push(new_tour);
  fs.writeFile(
    dir + '/dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'created',
        data: {
          tours: new_tour,
        },
      });
    }
  );
};
module.exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  });
};
module.exports.deleteTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: null,
  });
};
